const mongoose = require('mongoose');
const {Schema} = mongoose;

// balance: number, 
// transactionId: number / string, 
// description: string,
// type: credit
// createdAt : 

const TransactionSchema = new mongoose.Schema({
    balance : {
        type : Number,
    },
    transactionId : {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true
    },
    description : {
        type : String
    },
    productId : {
        type : String
    },
    type : {
        type : String,
    },
    walletId : {
        type : Schema.Types.ObjectId,
        ref : 'Wallet'
    }

},{timestamps : true})

module.exports = mongoose.model('Transaction', TransactionSchema)