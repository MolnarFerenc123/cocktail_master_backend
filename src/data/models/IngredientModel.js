const Sequelize = require('sequelize');
const sequelize = require('../datasources/db');

const IngredientModel = sequelize.define('Ingredient', {
    ingredient_id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    name: { 
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'ingredients',
    timestamps: false
});

module.exports = IngredientModel