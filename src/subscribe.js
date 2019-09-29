const tendermint = require('tendermint');
const { extractSignatures, getTx } = require('./aux-functions');
const schema = require('../schema');
const Block = schema.Block;

/**
 * subscribes to cosmos mainnet and logs new transactions signatures
 */
const followBlockchain = () => {
    const client = tendermint.RpcClient('wss://lunie.mariopino.es:46657')

    client.subscribe({ query: "tm.event = 'NewBlock'" }, event => {
        console.log('\n NEW BLOCK')
        console.log('\n TX:', event.block.data.txs)
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

