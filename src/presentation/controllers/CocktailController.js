const CocktailRepositoryImpl = require('../../data/repositories/CocktailRepositoryImpl');
const GetCocktailDetail = require('../../domain/usecases/GetCocktailDetailUseCase');
const GetCocktailListUseCase = require('../../domain/usecases/GetCocktailListUseCase');
const GetIngredientsListUseCase = require('../../domain/usecases/GetIngredientsListUseCase');

const cocktailRepository = new CocktailRepositoryImpl();

exports.getDetail = async (req, res) => {
    try {
        const useCase = new GetCocktailDetail(cocktailRepository);

        const result = await useCase.execute(req.params.id);

        if (!result) return res.status(404).json({ message: 'No coctail exists with this id' });
        
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCocktailList = async (req, res) => {
    try {
        const useCase = new GetCocktailListUseCase(cocktailRepository);

        const result = await useCase.execute();

        if (!result) return res.status(404).json({ message: 'Error while fetching cocktails' });

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getIngredientList = async (req, res) => {
    try {
        const useCase = new GetIngredientsListUseCase(cocktailRepository);

        const result = await useCase.execute();

        if (!result) return res.status(404).json({ message: 'Error while fetching ingredients' });

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};