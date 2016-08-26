import _ from 'lodash';
import deb from 'debug';

const debug = deb('node-app');
class DatabaseHelpers {
    createDb(config, connection, error) {
        return new Promise((resolve, reject) => {
            if (_.find(config.errors, { name: error.name, message: error.message })) {
                const query = 'CREATE DATABASE express_orm_dev DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;';
                connection.query(query, err => {
                    if (err) reject(err);
                    resolve();
                });
            } else reject(error);
        });
    }

    serverStart(app) {
        return new Promise((resolve) => {
            const server = app.listen(app.get('port'), () => {
                debug(`Express server listening on port ${server.address().port}`);
                resolve(`Running server on port ${app.get('port')}`);
            });
        });
    }

    getConnectionConfig(envConfig) {
        return {
            host: envConfig.host,
            user: envConfig.username,
            password: envConfig.password,
        };
    }

    static createInstance() {
        DatabaseHelpers.instance = new DatabaseHelpers();
        return DatabaseHelpers.instance;
    }
}

export default DatabaseHelpers;
