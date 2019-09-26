const methods = require('./methods');

// go through the whole Cosmos chain, starting at genesis block
const start = () => {
    methods.getCurrentBlock()
    .then( currentBlock => {
        console.log('\n\n CURRENT BLOCK IS', currentBlock)

        methods.getLastScannedBlock().then( height => {
            console.log('\n\n LAST SCANNED BLOCK WAS', height)
            
            if (currentBlock != null) {
                methods.crawlBlock(height, currentBlock);
            } else {
                console.log('\n REPEAT')
                start();
            }
        })
    })
}
// here the action begins
start();
