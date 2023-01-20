const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    ProductId : {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true
    }
    ,
    amount : {
        type : String,
        required : [true, 'pls provide amount'],

    },
    description : {
        type : String
    },
},{timestamps : true})

module.exports = mongoose.model('Products', ProductSchema)