const sequelize = require('../datasources/db');

const CocktailModel = require('./CocktailModel');
const IngredientModel = require('./IngredientModel');
const UnitModel = require('./UnitModel');
const ActionModel = require('./ActionModel');
const MakingStepModel = require('./MakingStepModel');

CocktailModel.hasMany(MakingStepModel, { foreignKey: 'cocktail_id' });
MakingStepModel.belongsTo(CocktailModel, { foreignKey: 'cocktail_id' });
MakingStepModel.belongsTo(IngredientModel, { foreignKey: 'ingredient_id' });
MakingStepModel.belongsTo(UnitModel, { foreignKey: 'ingredient_unit_id' });
MakingStepModel.belongsTo(ActionModel, { foreignKey: 'action_id' });

module.exports = {
    sequelize,
    CocktailModel,
    IngredienModelt,
    UnitModel,
    ActionModel,
    MakingStepModel
};