const Sequelize = require('sequelize');
const sequelize = require('../datasources/db');

const UnitModel = sequelize.define('Unit', {
    unit_id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    unit: { 
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'units',
    timestamps: false
});

module.exports = UnitModel