const Sequelize = require('sequelize');
const sequelize = require('../datasources/db');

const CocktailModel = sequelize.define('Cocktail', {
    cocktail_id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    name: { 
        type: Sequelize.STRING,
        allowNull: false
    },
    virgin: { 
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'cocktails',
    timestamps: false
});

module.exports = CocktailModel