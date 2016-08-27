import mysql from 'mysql';
import getLogger from '../utils/log';
import config from '../config';
import DatabaseHelpers from '../helpers/database.helpers';
import app from '../app';
import models from '../models';

const log = getLogger(module);
const databaseHelpers = DatabaseHelpers.createInstance();

app.set('port', process.env.PORT || 3000);

models.sequelize.sync().then(() => {
    databaseHelpers.serverStart(app).then(responce => log.info(responce));
}).catch((error) => {
    const connection = mysql.createConnection(databaseHelpers.getConnectionConfig(config));
    databaseHelpers.createDb(config, connection, error).then(() => {
        models.sequelize.sync().then(() => {
            databaseHelpers.serverStart(app).then(() => {
                log.info(`New database with the name ${config.get('database')} was created`);
                log.info(`Running server on port ${app.get('port')}`);
            });
        });
    }).catch(err => log.info(err));
});
