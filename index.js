const { getCurrentBlock, getLastScannedBlock, crawlBlock } = require('./src/functions');

/**
 * go through the whole Cosmos chain, scanning each block,
 * starting at block 1
 */
const start = () => {
    getCurrentBlock()
    .then( currentBlock => {
        console.log('\n\n CURRENT BLOCK IS', currentBlock)

        getLastScannedBlock().then( height => {
            console.log('\n\n LAST SCANNED BLOCK WAS', height)
            
            if (currentBlock != null) {
                crawlBlock(height, currentBlock);
            } else {
                console.log('\n REPEAT')
                start();
            }
        })
    })
}
// here the action begins
start();
