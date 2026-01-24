const CocktailRepository = require('../../domain/repositories/CocktailRepository');
const { Cocktail: SeqCocktail, MakingStep, Action, Ingredient, Unit } = require('../datasources/models');

class CocktailRepositoryImpl extends CocktailRepository {
    async getById(id) {
        // 1. Adatbázis lekérdezés (Sequelize)
        const dbResult = await SeqCocktail.findByPk(id, {
             include: [{
                model: MakingStep,
                include: [Action, Ingredient, Unit]
            }],
            order: [[MakingStep, 'step_number', 'ASC']]
        });

        if (!dbResult) return null;

        const steps = dbResult.MakingSteps.map(step => {
            return { 
                description: 'Kész, behelyettesített szöveg', 
                actionId: step.action_id 
            };
        });

        const { Cocktail } = require('../../domain/models/Cocktail');
        return new Cocktail(dbResult.cocktail_id, dbResult.name, dbResult.virgin, steps);
    }
}
module.exports = CocktailRepositoryImpl;