const transactionService = require('./transactionService');

class TransactionController {
    constructor(transactionService) {
        this.commitTransaction = this.commitTransaction.bind(this);
        this.tService = transactionService;
    }

    commitTransaction(req, res) {
        const body = req.body;
        return this.tService.commitTransaction(body)
            .then(transactionEvent => res.status(200).send(transactionEvent));
    }
}

module.exports = new TransactionController(transactionService);