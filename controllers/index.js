const { default: mongoose, Mongoose } = require('mongoose');
const Product = require('../models/products');
const Wallet = require('../models/wallet');
const Transaction = require('../models/transaction');

const setupWallet = async (req,res) => {
    try {
        console.log("Inside setupWallet");

        let balance = req.body.balance;
        balance = Number(balance.toFixed(4));

        const payload = {
            balance : balance,
            name : req.body.name
        }

        const  wallet = await Wallet.create(payload);
        
        res.status(201).json({
            walletId : wallet.walletId,
            balance : wallet.balance,
            transactionId : wallet.transactionId,
            name : wallet.name,
            date : wallet.createdAt
        });

    } catch (error) {
        throw error;
    }
}

const walletDetails = async (req,res) => {
    try {
        console.log("Inside walletDetails");

        const walletID = req.params; 
        const wallet = await Wallet.findOne(walletID);

        let fixed = wallet.balance.toFixed(4);
        fixed = Number(fixed);

        res.status(200).json({
            walletId : wallet.walletId,
            balance : fixed,
            name : wallet.name,
            createdAt : wallet.createdAt 
        });

    } catch (error) {
        throw error;
    }
}

const addCreditToWallet = async (req,res) => {
    try {
        console.log("Inside addCreditToWallet");

        const walletID = req.params;
        const wallet = await Wallet.findOne(walletID);

        let addAmount = req.body.amount;
        addAmount = Number(addAmount.toFixed(4));

        wallet.balance = wallet.balance + addAmount;
        wallet.balance = Number(wallet.balance.toFixed(4));
        
        await Wallet.updateOne(walletID,{ balance : wallet.balance});

        // const obj = {
        //     balance : wallet.balance,
        //     transactionId : mongoose.Types.ObjectId(),
        //     description : req.body.description,
        //     type : 'Credit',
        //     walletId : req.params.walletId
        // }

        // await Transaction.create(obj);

        res.status(200).json({
            balance : wallet.balance,
            transactionId : mongoose.Types.ObjectId(),
            description : req.body.description,
            type : "credit",
            createdAt : wallet.createdAt
        });

    } catch (error) {
        throw error;
    }
}

const getAllProduct = async (req,res) => {
    try {
        console.log("Inside getAllProduct");
        const products = await Product.find({},{_id : 0, createdAt: 0, updatedAt : 0, __v:0 });
        res.status(200).json(products);
    } catch (error) {
        throw error;
    }
}

const purchaseProduct = async (req,res) => {
    try {
        console.log("Inside purchaseProduct");

        const productID = req.body.productId;
        const walletID = req.params.walletId;

        const product = await Product.findOne({ProductId : productID });
        const wallet = await Wallet.findOne({walletId : walletID });

        if(wallet.balance >= product.amount){

            wallet.balance = wallet.balance - product.amount;
            wallet.balance = Number(wallet.balance.toFixed(4));
            await Wallet.updateOne({walletId : walletID}, {balance : wallet.balance});

            const obj = {
                balance : wallet.balance,
                transactionId : mongoose.Types.ObjectId(),
                description : product.description,
                productId : productID,
                type : 'debit',
                walletId : req.params.walletId
            }

            await Transaction.create(obj);
            
            return res.status(200).json({
                balance : wallet.balance,
                transactionId : mongoose.Types.ObjectId(),
                description : product.description,
                type : "debit",
                productId : req.body.productId,
                createdAt : new Date()
            })
        }
    } catch (error) {
        throw error;
    }
}

const getAllTransaction = async (req,res) => {
    try {
        console.log("Inside getAllTransaction");

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 2;
        const skip = (page - 1) * limit;

        const transaction = await Transaction.find(req.params, {
            _id : 0,
            updatedAt : 0,
            __v : 0,
            walletId : 0
        })
        .skip(skip)
        .limit(limit);

        

        res.status(200).json(transaction);

    } catch (error) {
        throw error;
    }
}

const createProduct = async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json({ product });
  };

module.exports = {
    setupWallet,
    walletDetails,
    addCreditToWallet,
    getAllProduct,
    purchaseProduct,
    getAllTransaction,
    createProduct
}