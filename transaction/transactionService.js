const uuidv1 = require('uuid/v1');
const historyService = require('../history/historyService');

class TransactionService {
    
    #user = {
        accountBalans: 0
    }

    constructor(historyService) {
        this.creditType = 'credit';
        this.debitType = 'debit';
        this.historyService = historyService;
    }
    getAccount() {
        return this.#user;
    }

    commitTransaction(transaction) {
        return Promise.resolve(transaction)
            .then(transaction => this.updateAccountBalans(transaction))
            .then((transaction) => {
                const transactionEvent = {
                    id: uuidv1(),
                    type: transaction.type,
                    amount: transaction.amount,
                    effectiveDate: new Date()
                }
                return this.historyService.addEventToHistory(transactionEvent);
            });
    }

    updateAccountBalans(transaction) {
        if (transaction.type === this.creditType) {
            this.precessCredit(transaction)
        } else if (transaction.type === this.debitType) {
            this.precessDebit(transaction);
        }
        return transaction;
    }

    precessDebit(transaction) {
        //reduce
        this.#user.accountBalans = this.#user.accountBalans - transaction.amount;
    }

    precessCredit(transaction) {
        //increase
        this.#user.accountBalans = this.#user.accountBalans + transaction.amount;
    }

}

module.exports = new TransactionService(historyService);
