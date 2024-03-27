import Sequelize from 'sequelize';
import DATABASE_DEFAULT, {
    DATABASE_DEV,
    DATABASE_PROD
} from '../config/database.js';

import args from '../utils/args.js';

let database;
if (args['--mode']) {
    if (args['--mode'] === 'prod') {
        database = DATABASE_PROD;
    } else if (args['--mode'] === 'dev') {
        database = DATABASE_DEV;
    } else {
        database = DATABASE_DEFAULT;
    }
} else {
    database = DATABASE_DEFAULT;
}

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
