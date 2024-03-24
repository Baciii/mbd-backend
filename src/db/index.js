import Sequelize from 'sequelize';
import database from '../config/database.js';

const seq = new Sequelize(database.DATABASE, database.USER, database.PASSWORD, {
    dialect: 'mysql',
    host: database.HOST,
    port: 3306
});

seq.authenticate()
    .then(() => {
        console.log('success');
    })
    .catch((err) => {
        console.log(err);
    });

export default seq;
