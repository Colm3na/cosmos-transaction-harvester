// Here there are the functions that directly interact with the start() function

const { getTx, extractSignatures } = require('./aux-functions');
const axios = require('axios');
const schema = require('../schema');
const followBlockchain = require('./subscribe');
const baseURL = process.env.STARGATE;
const Block = schema.Block;
require('dotenv').config();


/**
 * 
 * @param {String} height 
 * @param {String} current_height
 * 
 * checker to see if crawler is already synced and should subscribe to the chain 
 */
const crawlOrSubscribe = (height, current_height) => {
    if ( height < current_height ) {
        height++;
        crawlBlock(height, current_height);
    } else {
        followBlockchain()
    }
}

/**
 * 
 * @param {String} height 
 * @param {String} current_height 
 * 
 *  * main function
 * 
 * goes block by block making an rpc call to extract the transactions hashes 
 * (using the extractSignatures() func), to then send those hashes to getTX(),
 * which is the responsible for checking if the transaction comes from Lunie and, 
 * in that case, save it.
 * 
 * It also keeps checking if the crawler already synced to switch to subscribing to
 * the chain with the followBlockchain() function.
 */
const crawlBlock = async (height, current_height) => {
    axios.get(`${baseURL}/blocks/${height}`)
    .then( (data) => {
        console.log('\n CURRENT HEIGHT IS', height)

        let signaturesArray = data.data.block.data.txs;
        let txHashes;
        if (signaturesArray != null) {
            txHashes = extractSignatures(signaturesArray);
            console.log('\n\n TXHASHES', txHashes);
            let counter = 0;

            // extract TX hashes from block and check them 
            txHashes.forEach( (txHash, index, txHashes) => {
                counter++;

                if( counter === txHashes.length) {
                   crawlOrSubscribe( height, current_height)
                }
                // check TX to see if it comes from Lunie
                getTx(txHash);
            })

            // store Block's height in DB to keep track of scanned blocks
            let lastBlock = new Block({height: height, scanDate: Date()});
            lastBlock.save();

        } else {
            // store Block's height in DB to keep track of scanned blocks
            let lastBlock = new Block({height: height, scanDate: Date()});
            lastBlock.save();

            crawlOrSubscribe( height, current_height)
        }
    })
    .catch( (error) => {
        height--;
        console.log(error)
        console.log('\nTHERE WAS AN ERROR. RETRY')
        crawlBlock(height, current_height);
    });
}

/**
 * gets the last scanned block from the DB
 */
const getLastScannedBlock = async () => {
    const lastBlock = await Block.findOne().sort({ _id: -1 });

    if (lastBlock == null) {
        return 1;
    } else {
        return lastBlock.height;
    }
}

/**
 * gets the current block from mainnet
 */
const getCurrentBlock = async () => {
    try {
        const currentBlock = await axios.get(`${baseURL}/blocks/latest`);

        const height = currentBlock.data.block.header.height;
        return height;
    } catch {
        console.log('AN ERROR OCCURED. RETRY')
        getCurrentBlock();
    }
}


module.exports = {
    getCurrentBlock,
    getLastScannedBlock,
    crawlBlock,
}