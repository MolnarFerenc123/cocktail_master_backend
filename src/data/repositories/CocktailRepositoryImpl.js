const CocktailRepository = require('../../domain/repositories/CocktailRepository');
const Cocktail = require('../../domain/models/Cocktail');

const { 
    CocktailModel, 
    MakingStepModel, 
    ActionModel, 
    IngredientModel, 
    UnitModel 
} = require('../models'); 

class CocktailRepositoryImpl extends CocktailRepository {
    
    async getById(id) {
        const dbCocktail = await CocktailModel.findByPk(id, {
            include: [{
                model: MakingStepModel,
                include: [
                    { model: ActionModel },
                    { model: IngredientModel },
                    { model: UnitModel }
                ]
            }],
            order: [[MakingStepModel, 'step_number', 'ASC']]
        });

        if (!dbCocktail) return null;

        const steps = dbCocktail.MakingSteps.map(step => {
            return {
                stepId: step.making_step_id,
                stepNumber: step.step_number,
                actionId: step.action_id,
                
                description: step.Action ? step.Action.description : '', 
                
                details: {
                    ingredient: step.Ingredient ? step.Ingredient.name : null,
                    amount: step.ingredient_amount || null,
                    unit: step.Unit ? step.Unit.unit : null
                }
            };
        });

        return new Cocktail({
            id: dbCocktail.cocktail_id,
            name: dbCocktail.name,
            isVirgin: !!dbCocktail.virgin,
            steps: steps
        });
    }
}

module.exports = CocktailRepositoryImpl;