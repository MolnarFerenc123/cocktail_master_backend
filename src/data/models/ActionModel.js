const Sequelize = require('sequelize');
const sequelize = require('../datasources/db');

const ActionModel = sequelize.define('Action', {
    action_id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    description: { 
        type: Sequelize.STRING,
        allowNull: false
    } 
}, {
    tableName: 'actions',
    timestamps: false
});

module.exports = ActionModel