// In this file the models for the DB are created

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb://${process.env.MONGODIR}:27017/transactionCollector`, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.catch( (error) => {
    console.log(error);
});

const mongo = mongoose.connection;

// the transaction schema
const txSchema = mongoose.Schema({
    hash: {
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
    },
    kind: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    memo: {
        type: String
    },
    amount: {
        type: String,
        required: true
    },
    from_addr: {
        type: String
    },
    to_addr: {
        type: String
    },
    delegator_addr: {
        type: String
    },
    validator_addr: {
        type: [String]
    },
    vote: {
        proposal_id: {
            type: String
        },
        option: {
            type: String
        },
    },
})

/** 
 * the block schema. The purpose of this item is simply to be able 
 * to keep track of the scanned blocks. So we can resume the scan
 * from the last scanned block.
*/
const scannedBlockSchema = mongoose.Schema({
    height: {
        type: Number,
        required: true
    },
    scanDate: {
        type: Date,
        required: true
    }
})

const TX = mongo.model('TX', txSchema);
const Block = mongo.model('Block', scannedBlockSchema);

module.exports = { TX, Block };