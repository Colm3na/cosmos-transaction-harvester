const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/transactionCollector', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.catch( (error) => {
    console.log(error);
});

const mongo = mongoose.connection;

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
        type: [String],
        required: true
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