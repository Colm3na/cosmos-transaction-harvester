const axios = require('axios');
const sha256 = require('js-sha256').sha256;
const schema = require(__dirname + "/schema.js");
require('dotenv').config()

const baseURL = process.env.STARGATE
const mockHash = '64156BE924D6269AB385E404DFACFCF218633047AF3C879A4F0B8596C7F73C7B';
// 6130997DA6C69A0B301271EB40889A33CEE48078F947493AB70B68097297DABB
const TX = schema.TX;
const isLunie = /^(Sent via Lunie)/;
const port = process.env.DEFAULT_PORT;
if (port == null || port == "") {
    port = 3000;
}
  
let CURRENT_BLOCK;
let NEXT_BLOCK;

// // Get current block
// axios.get(`${baseURL}:26657/status`)
// .then( data => {
//     console.log(data.data.result.sync_info.latest_block_height)
// })
// .catch( (error) => {
//     console.log(error);
// });

const extractSignatures = (signatures) => {
    let hashes = [];
    signatures.forEach( signature => {
        let buf = Buffer.from(signature, 'base64');
        let txHash = sha256(buf);
        hashes.push(txHash);
    })
    return hashes;
}

const checkIsLunie = async (tx) => {
    if (tx.memo.match(isLunie)) {
        console.log('\n\n Lunie transaction!!!!!!!!!!')
        await tx.save()
        .catch( err => console.log(`There was an error: \n ${err}`))
    }
}

// setInterval( () => {
    // axios.get(`${baseURL}/blocks/latest`)
    axios.get(`${baseURL}/blocks/30227`) // Searching for a 'Sent from Lunie' memo
    .then( data => {

        CURRENT_BLOCK = data.data.block.header.height;
        NEXT_BLOCK = data.data.block.header.height;

        let signaturesArray = data.data.block.data.txs;

        let txHashes = extractSignatures(signaturesArray);

        console.log('\n\n TXHASHES', txHashes);
        
        txHashes.forEach( txHash => {
            getTx(txHash);
        })

        const checkBlock = () => {
            console.log(CURRENT_BLOCK)
            NEXT_BLOCK = data.data.block.header.height;
            if(CURRENT_BLOCK < NEXT_BLOCK) {
                console.log('\n\n NEXT')
                console.log(data.data.block.header.height);
            }
        }

    })
    .catch( (error) => {
        console.log(error);
    });
// }, 3000)


const getTx = async (hash) => {

    await axios.get(`${baseURL}/txs/${hash}`)
    .then( (data) => {

        let newTX = new TX;

        newTX.memo = data.data.tx.value.memo;
        newTX.hash = data.data.txhash;
        newTX.kind = data.data.tx.value.msg[0].type;
        newTX.timestamp = data.data.timestamp;

        if (data.data.tx.value.fee.amount !== null) {
            newTX.amount = data.data.tx.value.fee.amount[0].amount;
        } else {
            newTX.amount = '0';
        }

        switch(newTX.kind) {
            case 'cosmos-sdk/MsgSend':
                newTX.from_addr = data.data.tx.value.msg[0].value.from_address;
                newTX.to_addr = data.data.tx.value.msg[0].value.to_address;
                break;
            case 'cosmos-sdk/MsgWithdrawDelegationReward':
                newTX.delegator_addr = data.data.tx.value.msg[0].value.delegator_address;
                newTX.validator_addr = [];
                
                for( let i = 0; i < data.data.tx.value.msg.length; i++) {
                    newTX.validator_addr.push(data.data.tx.value.msg[i].value.validator_address)
                }
                break;
            case 'cosmos-sdk/MsgVote':
                newTX.vote.proposal_id = data.data.tx.value.msg[0].value.proposal_id;
                newTX.vote.option = data.data.tx.value.msg[0].value.option;
                break;
            case 'cosmos-sdk/MsgDelegate':
                newTX.delegator_addr = data.data.tx.value.msg[0].value.delegator_address;
                newTX.validator_addr = data.data.tx.value.msg[0].value.validator_address;
                newTX.amount = data.data.tx.value.msg[0].value.amount.amount;
                break;
            default:
                break;
        }

        console.log(`\n\n NEW TX is`, newTX)
        checkIsLunie(newTX);

    })
    .catch( (error) => {
        console.log(error);
    });
}
