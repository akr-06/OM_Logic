const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
    walletId : {
        type : String
    },
    balance : {
        type : Number,
        required : [true, 'pls provide amount'],

    },
    transactionId : {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true
    },
    name : {
        type : String
    },

},{timestamps : true})

module.exports = mongoose.model('Wallet', WalletSchema)