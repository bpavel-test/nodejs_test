const transactionCtrl = require('../transaction/transaction.controller');
const transactionValidator = require('../transaction/transactionValidator');
const router = require('express').Router();

router.post('/commit-transaction',
    transactionValidator.validateTransaction,
    transactionCtrl.commitTransaction
);

module.exports = router;