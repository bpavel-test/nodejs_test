const transactionService = require('./transactionService');

class TransactionValidator {
    constructor(transactionService) {
        this.creditType = 'credit';
        this.debitType = 'debit';
        this.transactionService = transactionService;
        this.validateTransaction = this.validateTransaction.bind(this);
    }

    validateTransaction(req, res, next) {
        const transaction = req.body;
        if (!transaction || !transaction.type || !transaction.hasOwnProperty('amount')) {
            res.status(400).send({message: 'Request body should contains properties type and amount'});
        } else if (transaction.type === this.creditType) {
            this.validateCredit(res, transaction);
        } else if (transaction.type === this.debitType) {
            this.validateDebit(res, transaction);
        } else if (transaction.type !== this.creditType && transaction.type !== this.debitType) {
            res.status(400).send({message:`Invalid transaction type ${transaction.type}.`});
        } 

        if (!res.headersSent) {
            return next();
        }
    }

    validateCredit(res, transaction) {
        if (typeof transaction.amount !== 'number') {
            res.status(400).send({message: `Transaction amount has to be a number`});
        }

        if (transaction.amount < 0) {
            res.status(400).send({message: 'Transaction amount can\'t be negative number'});
        }
    }

    validateDebit(res, transaction) {
        const activeBalans = this.transactionService.getAccount().accountBalans;
        if (typeof transaction.amount !== 'number') {
            res.status(400).send({message: `Transaction amount has to be a number`});
        }

        if (transaction.amount < 0) {
            res.status(400).send({message: 'Transaction amount can\'t be negative number'});
        }

        if (activeBalans - transaction.amount < 0) {
            res.status(412).send({message: 'Transaction rejected, insufficient funds'});
        }
    }


}

module.exports = new TransactionValidator(transactionService);