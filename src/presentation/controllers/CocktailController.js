const CocktailRepositoryImpl = require('../../data/repositories/CocktailRepositoryImpl');
const GetCocktailDetail = require('../../domain/usecases/GetCocktailDetailUseCase');

exports.getDetail = async (req, res) => {
    try {
        const repository = new CocktailRepositoryImpl();
        const useCase = new GetCocktailDetail(repository);

        const result = await useCase.execute(req.params.id);

        if (!result) return res.status(404).json({ message: 'Nincs ilyen' });
        
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};