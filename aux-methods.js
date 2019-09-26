const axios = require('axios');
const sha256 = require('js-sha256').sha256;
const schema = require(__dirname + "/schema.js");
const TX = schema.TX;
const isLunie = /^(Sent via Lunie)/;
require('dotenv').config();
const baseURL = process.env.STARGATE;

const mockHash = '64156BE924D6269AB385E404DFACFCF218633047AF3C879A4F0B8596C7F73C7B';
// 6130997DA6C69A0B301271EB40889A33CEE48078F947493AB70B68097297DABB

const extractSignatures = (signatures) => {
    let hashes = [];
    signatures.forEach( signature => {
        let buf = Buffer.from(signature, 'base64');
        let txHash = sha256(buf);
        hashes.push(txHash);
    })
    return hashes;
}

const avoidDupliAndSave = async (tx) => {

    const dupTX = await TX.findOne({hash: tx.hash});

    if (dupTX != null) {
        console.log('\n DUPLICATE FOUND')
        return true;
    } else {
        console.log('\n EVERYTHING is OK')
        console.log('\n GOING TO SAVE')
        await tx.save();
    }
}

const getTx = async (hash) => {

    await axios.get(`${baseURL}/txs/${hash}`)
    .then( (data) => {

        let memo = data.data.tx.value.memo;

        if (memo.match(isLunie)) {
            console.log('\n\n LUNIE Transaction!!!!!!!!!!')

            let newTX = new TX;

            newTX.height = data.data.height;
            newTX.memo = memo;
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
            avoidDupliAndSave(newTX);
        }
    })
    .catch( (error) => {
        console.log(error);
        getTx(hash);
    });
}

module.exports = {
    extractSignatures,
    getTx,
}