class GetCocktailDetailUseCase {
    constructor(cocktailRepository) {
        this.cocktailRepository = cocktailRepository;
    }

    async execute(id) {
        return await this.cocktailRepository.getById(id);
    }
}

module.exports = GetCocktailDetailUseCase;