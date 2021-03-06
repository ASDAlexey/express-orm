import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../config';

const sequelize = new Sequelize(config.get('database'), config.get('username'), config.get('password'), config.get());
const db = {};

fs.readdirSync(__dirname)
    .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js'))
    .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if ('associate' in db[modelName]) db[modelName].associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
