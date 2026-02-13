const CocktailRepository = require('../../domain/repositories/CocktailRepository');
const Cocktail = require('../../domain/models/Cocktail');
const Ingredient = require('../../domain/models/Ingredient');

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

        return new Cocktail(dbCocktail.cocktail_id, dbCocktail.name, !!dbCocktail.virgin, steps);
    }

    async getAllCocktails() {
        const dbCocktail = await CocktailModel.findAll();

        if (!dbCocktail) return null;

        return dbCocktail.map( cocktailModel => {
            return new Cocktail(cocktailModel.cocktail_id, cocktailModel.name, cocktailModel.virgin, null)
        })
    }

    async getAllIngredients() {
        const dbIngredient = await IngredientModel.findAll();

        if (!dbIngredient) return null;

        return dbIngredient.map( ingredientModel => {
            return new Ingredient(ingredientModel.ingredient_id, ingredientModel.name)
        })
    }

    async getCoctailsWithFilter() {
        const dbIngredient = await IngredientModel.findAll();

        if (!dbIngredient) return null;

        return dbIngredient.map( ingredientModel => {
            return new Ingredient(ingredientModel.ingredient_id, ingredientModel.name)
        })
    }

    async search(filters) {
        const Fuse = require('fuse.js');
        
        const whereClause = {};

        if (filters.isVirgin !== undefined && filters.isVirgin !== null) {
            whereClause.virgin = filters.isVirgin;
        }

        const dbCocktails = await CocktailModel.findAll({
            where: whereClause,
            include: [{
                model: MakingStepModel,
                include: [{ model: IngredientModel }]
            }]
        });

        let results = dbCocktails.map(dbItem => {
            const ingredientIds = dbItem.MakingSteps
                .map(step => step.Ingredient ? step.Ingredient.ingredient_id : null)
                .filter(id => id !== null);

            const cocktail = new Cocktail(
                dbItem.cocktail_id,
                dbItem.name,
                !!dbItem.virgin,
                null
            );
            
            cocktail._ingredientIds = ingredientIds; 
            return cocktail;
        });

        if (filters.name) {
            const options = {
                keys: ['name'],
                threshold: 0.4,
                minMatchCharLength: 2
            };

            const fuse = new Fuse(results, options);

            results = fuse.search(filters.name).map(result => result.item);
        }

        if (filters.ingredientIds && filters.ingredientIds.length > 0) {
            const userIngredients = filters.ingredientIds.map(id => parseInt(id));

            results = results.map(cocktail => {
                const matchCount = cocktail._ingredientIds.filter(id => 
                    userIngredients.includes(id)
                ).length;

                cocktail._matchCount = matchCount;
                return cocktail;
            });

            results = results.filter(c => c._matchCount > 0);
            results.sort((a, b) => b._matchCount - a._matchCount);
        }

        return results.map(c => {
            delete c._ingredientIds;
            delete c._matchCount;
            return c;
        });
    }
}

module.exports = CocktailRepositoryImpl;