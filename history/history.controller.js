const historyService = require('./historyService');

class HistoryController {
    constructor(historyService) {
        this.historyService = historyService;
        this.getAllHistory = this.getAllHistory.bind(this);
        this.getHistoryById = this.getHistoryById.bind(this);
    }

    getAllHistory(req, res) {
        return this.historyService.getAllHistory()
            .then(history => res.status(200).send(history));
    }

    getHistoryById(req, res) {
        const eventId = req.params.id;
        return this.historyService.getHistoryById(eventId)
            .then((event) => res.status(200).send(event));
    }
}

module.exports = new HistoryController(historyService);