import mysql from 'mysql';

const path = require("path");
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, '..', 'config', 'config.json'));
const databaseHelpers = require(path.join(__dirname, '..', 'helpers', 'database.helpers.js'));
const envConfig = config.env[env];
const _ = require('lodash');

const app = require('../app');
const models = require("../models");

app.set('port', process.env.PORT || 3000);

models.sequelize.sync().then(() => {
    databaseHelpers.serverStart(app).then(responce => console.log(responce));
}).catch((error) => {
    var connection = mysql.createConnection({
        host: envConfig.host,
        user: envConfig.username,
        password: envConfig.password,
    });
    databaseHelpers.createDb(config, connection, error, () => {
        models.sequelize.sync().then(() => databaseHelpers.serverStart(app));
        console.log(`New database with the name ${envConfig.database} was created`);
        console.log(`Running server on port ${app.get('port')}`);
    });
});