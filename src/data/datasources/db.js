const Sequelize = require('sequelize');
require('dotenv').config();

const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;
if (!DB_NAME || !DB_USER || !DB_HOST) {
    console.error("ERROR: Missing database settings from .env file");
    process.exit(1);
}

const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASS,
    {
        host: DB_HOST,
        dialect: 'mysql',
        logging: false, 
        define: {
            timestamps: false
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

module.exports = sequelize;