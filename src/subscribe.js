const tendermint = require('tendermint');
const { extractSignatures, getTx } = require('./aux-methods');
const schema = require('../schema');
const Block = schema.Block;


const followBlockchain = () => {
    const client = tendermint.RpcClient('wss://lunie.mariopino.es:46657')

    client.subscribe({ query: "tm.event = 'NewBlock'" }, event => {
    // client.subscribe({ query: "tm.event = 'Tx'" }, event => {
        // "tm.event = 'Tx' AND tx.height = 3"
        console.log('\n NEW BLOCK')
        console.log('\n TX:', event.block.data.txs)
        // console.log(event.TxResult.result.tags)
        let signaturesArray = event.block.data.txs;
        let height = event.block.header.height;

        if (signaturesArray != null) {
            txHashes = extractSignatures(signaturesArray);
            console.log('\n\n TXHASHES', txHashes);
            let counter = 0;

            // extract TX hashes from block and check them 
            txHashes.forEach( (txHash, index, txHashes) => {
                counter++;

                // check TX to see if it comes from Lunie
                getTx(txHash);
            })

            // store Block's height in DB to keep track of scanned blocks
            let lastBlock = new Block({height: height, scanDate: Date()});
            lastBlock.save();
        }
    })
}

module.exports = followBlockchain;

