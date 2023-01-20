const express = require('express');
const router = express.Router();

const {setupWallet,walletDetails,addCreditToWallet, purchaseProduct, getAllProduct, getAllTransaction, createProduct} = require('../controllers/index');

router.route('/wallet').post(setupWallet);
router.route('/wallet/:walletId').get(walletDetails);

router.route('/wallet/:walletId/transaction').post(addCreditToWallet);

router.route('/products').get(getAllProduct).post(createProduct);
router.route('/wallet/:walletId/purchase').post(purchaseProduct);
router.route('/wallet/:walletId/transaction').get(getAllTransaction);

module.exports = router;
