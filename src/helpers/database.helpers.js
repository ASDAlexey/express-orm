import _ from 'lodash';

class DatabaseHelpers {
    createDb(config, connection, error) {
        return new Promise((resolve, reject) => {
            if (_.find(config.get('errors'), { name: error.name, message: error.message })) {
                const query = `CREATE DATABASE ${config.get('database')} DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;`;
                connection.query(query, err => {
                    if (err) reject(err);
                    resolve();
                });
            } else reject(error);
        });
    }

    serverStart(app) {
        return new Promise((resolve) => {
            app.listen(app.get('port'), () => {
                resolve(`Running server on port ${app.get('port')}`);
            });
        });
    }

    getConnectionConfig(config) {
        return {
            host: config.get('host'),
            user: config.get('username'),
            password: config.get('password'),
        };
    }

    static createInstance() {
        DatabaseHelpers.instance = new DatabaseHelpers();
        return DatabaseHelpers.instance;
    }
}

export default DatabaseHelpers;
