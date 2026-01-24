const Sequelize = require('sequelize');
const sequelize = require('../datasources/db');

const MakingStepModel = sequelize.define('MakingStep', {
    making_step_id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    cocktail_id: { type: Sequelize.INTEGER },
    ingredient_id: { type: Sequelize.INTEGER },
    ingredient_amount: { type: Sequelize.FLOAT },
    ingredient_unit_id: { type: Sequelize.INTEGER },
    action_id: { type: Sequelize.INTEGER },
    step_number: { type: Sequelize.INTEGER }
}, {
    tableName: 'making_steps',
    timestamps: false
});

module.exports = MakingStepModel