const express = require('express');
const axios = require('axios');
const sha256 = require('js-sha256').sha256;
const schema = require(__dirname + "/schema.js");
require('dotenv').config()

const app = express();

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
        console.log('\n\n SIGNATURE', signature)
        let txHash = sha256(buf);
        hashes.push(txHash);
    })
    return hashes;
}

// setInterval( () => {
    // axios.get(`${baseURL}/blocks/latest`)
    axios.get(`${baseURL}/blocks/1154113`) // Searching for a 'Sent from Lunie' memo
    .then( data => {
        console.log(data.data)
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
        const memo = data.data.tx.value.memo;
        const txHash = data.data.txhash;
        const txType = data.data.tx.value.msg[0].type;
        const txTimeStamp = data.data.timestamp;
        let txAmount;
        if (data.data.tx.value.fee.amount !== null) {
            txAmount = data.data.tx.value.fee.amount[0].amount;
        } else {
            txAmount = '0';
        }
        let txFromAddress;
        let txToAddress;
        let txDelAddress;
        let txValAddress;
        let txProposalID;
        let txVoteOption;

        switch(txType) {
            case 'cosmos-sdk/MsgSend':
                txFromAddress = data.data.tx.value.msg[0].value.from_address;
                txToAddress = data.data.tx.value.msg[0].value.to_address;
                break;
            case 'cosmos-sdk/MsgWithdrawDelegationReward':
                txDelAddress = data.data.tx.value.msg[0].value.delegator_address;
                txValAddress = [];
                
                for( let i = 0; i < data.data.tx.value.msg.length; i++) {
                    txValAddress.push(data.data.tx.value.msg[i].value.validator_address)
                }
                break;
            case 'cosmos-sdk/MsgVote':
                txProposalID = data.data.tx.value.msg[0].value.proposal_id;
                txVoteOption = data.data.tx.value.msg[0].value.option;
                break;
            default:
                break;
        }

        console.log(`MEMO is`, memo)
        console.log(`TX is`, txHash)
        console.log(`TXTYPE is`, txType)
        console.log(`TXTimestamp is`, txTimeStamp)
        console.log(`TXAmount is`, txAmount)
        console.log(`txFromAddress is`, txFromAddress)
        console.log(`txToAddress is`, txToAddress)
        console.log(`TXDelAddr is`, txDelAddress)
        console.log(`TXValAddr is`, txValAddress)
        console.log(`TXProposalID is`, txProposalID)
        console.log(`TXVoteOption is`, txVoteOption)

        if (memo.match(isLunie)) {
            console.log('\n\n Lunie transaction!!!!!!!!!!')
            let newTX = new TX({
                hash: txHash,
                kind: txType,
                timestamp: txTimeStamp,
                amount: txAmount,
                from_addr: txFromAddress,
                to_addr: txToAddress,
                delegator_addr: txDelAddress,
                validator_addr: txValAddress,
                vote: {
                    proposal_id: txProposalID,
                    option: txVoteOption,
                },
            })
        }
    })
    .catch( (error) => {
        console.log(error);
    });
}
