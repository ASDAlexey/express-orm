const _ = require('lodash');
const debug = require('debug')('node-app');

module.exports.createDb = (config, connection, error, callback) => {
    if (_.find(config.errors, { name: error.name, message: error.message })) {
        connection.query('CREATE DATABASE express_orm_dev DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;', (err) => {
            if (err) throw err;
            callback();
        });
    } else throw error;
};

module.exports.serverStart = (app) => {
    return new Promise((resolve, reject) => {
        const server = app.listen(app.get('port'), () => {
            debug(`Express server listening on port ${server.address().port}`);
            resolve(`Running server on port ${app.get('port')}`);
        });
    });
};