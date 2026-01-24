class Cocktail {
    constructor(id, name, isVirgin, steps) {
        this.id = id;
        this.name = name;
        this.isVirgin = isVirgin;
        this.steps = steps || [];
    }
}
module.exports = Cocktail;