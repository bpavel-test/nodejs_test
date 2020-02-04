const router = require('express').Router();
const historyCtrl = require('../history/history.controller');

router.get('/', historyCtrl.getAllHistory);
router.get('/:id', historyCtrl.getHistoryById)

module.exports = router;