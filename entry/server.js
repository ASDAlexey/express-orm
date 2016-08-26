import mysql from 'mysql';
import config from '../config/config.json';
import DatabaseHelpers from '../helpers/database.helpers';
import app from '../app';
import models from '../models';

const env = process.env.NODE_ENV || 'development';
const envConfig = config.env[env];
const databaseHelpers = DatabaseHelpers.createInstance();

app.set('port', process.env.PORT || 3000);

models.sequelize.sync().then(() => {
    databaseHelpers.serverStart(app).then(responce => console.log(responce));
}).catch((error) => {
    const connection = mysql.createConnection(databaseHelpers.getConnectionConfig(envConfig));
    databaseHelpers.createDb(config, connection, error).then(() => {
        databaseHelpers.serverStart(app).then(() => {
            console.log(`New database with the name ${envConfig.database} was created`);
            console.log(`Running server on port ${app.get('port')}`);
        });
    });
});