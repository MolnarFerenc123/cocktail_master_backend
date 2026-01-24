class GetCocktailListUseCase {
    constructor(cocktailRepository) {
        this.cocktailRepository = cocktailRepository;
    }

    async execute(id) {
        return await this.cocktailRepository.getAllCocktails();
    }
}

module.exports = GetCocktailListUseCase;