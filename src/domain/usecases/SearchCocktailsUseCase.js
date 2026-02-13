class SearchCocktailsUseCase {
    constructor(cocktailRepository) {
        this.cocktailRepository = cocktailRepository;
    }

    async execute(filters) {
        return await this.cocktailRepository.search(filters);
    }
}

module.exports = SearchCocktailsUseCase;