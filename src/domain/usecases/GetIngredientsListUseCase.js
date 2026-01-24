class GetIngredientsListUseCase {
    constructor(cocktailRepository) {
        this.cocktailRepository = cocktailRepository;
    }

    async execute(id) {
        return await this.cocktailRepository.getAllIngredients();
    }
}

module.exports = GetIngredientsListUseCase;