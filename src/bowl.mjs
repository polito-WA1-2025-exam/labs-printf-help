// BOWL CLASS
export class Bowl {
    constructor() {
        this.size = null; // Size of the bowl
        this.base = null; // Base of the bowl
        this.proteins = []; // List of proteins in the bowl
        this.ingredients = []; // List of ingredients in the bowl
    }

    getSize() {
        return this.size.getSize();
    }

    getBase() {
        return this.base.getBase();
    }

    getProteins() {
        return [...this.proteins];
    }

    getIngredients() {
        return [...this.ingredients];
    }

    setSize(size) {
        this.size = new Size(size);
    }

    setBase(base) {
        this.base = new Base(base);
    }

    setProteins(proteins) {
        this.proteins = []; // Reset proteins before adding new ones
        proteins.forEach(protein => {
            this.proteins.push(new Protein(protein));
        });
    }

    setIngredients(ingredients) {
        this.ingredients = []; // Reset ingredients before adding new ones
        ingredients.forEach(ingredient => {
            this.ingredients.push(new Ingredient(ingredient));
        });
    }

    displayContents() {
        console.log();
        console.log('Size: ' + this.getSize());
        console.log('Base: ' + this.getBase());
        console.log('Proteins: ' + this.getProteins().map(protein => protein.getProtein()));
        console.log('Ingredients: ' + this.getIngredients().map(ingredient => ingredient.getIngredient()));
    }

    toJSON() {
        return {
            size: this.size ? this.size.getSize() : null,
            base: this.base ? this.base.getBase() : null,
            proteins: this.proteins.map(p => p.getProtein()),
            ingredients: this.ingredients.map(i => i.getIngredient())
        };
    }
}

// SIZE CLASS
class Size {
    constructor(sizeType) {
        this.sizeType = sizeType;
        this.converter = { 3: 'L', 2: 'M', 1: 'S' };
    }

    getSize() {
        return this.sizeType;
    }

    // Function to facilitate the return of the size in number format
    getMaxProteins() {
        return this.converter[this.sizeType];
    }

    getMaxIngredients() {
        if (this.sizeType === "L") {
            return 6;
        }
        return 4;
    }
}

// BASE CLASS
class Base {
    constructor(baseName) {
        this.baseName = baseName;
    }

    getBase() {
        return this.baseName;
    }
}

// PROTEIN CLASS
class Protein {
    constructor(proteinName) {
        this.proteinName = proteinName;
    }

    getProtein() {
        return this.proteinName;
    }
}

// INGREDIENT CLASS
class Ingredient {
    constructor(ingredientName) {
        this.ingredientName = ingredientName;
    }

    getIngredient() {
        return this.ingredientName;
    }
}