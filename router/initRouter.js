const historyRouter = require('./historyRouter');
const transactionRouter = require('./transactionRouter');

function initRouter(app) {
    app.use('/history', historyRouter);
    app.use('/account', transactionRouter);
}

module.exports = {
    initRouter
}