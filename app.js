const express = require('express');
const routesManager = require('./router/initRouter');
const bodyParser = require('body-parser')
const app = express();
const appPort = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routesManager.initRouter(app);

app.listen(appPort, () => {
    console.log(`Server is running on ${appPort}`);
})