const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/transactionCollector', {
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
    kind: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    memo: {
        type: String,
        required: true
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

const TX = mongo.model('TX', txSchema);

module.exports = { TX };