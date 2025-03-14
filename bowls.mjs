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
        console.log('Size: ' + this.getSize());
        console.log('Base: ' + this.getBase());
        console.log('Proteins: ' + this.getProteins().map(protein => protein.getProtein()));
        console.log('Ingredients: ' + this.getIngredients().map(ingredient => ingredient.getIngredient()));
    }
}

/*
export class Bowl {
    constructor() {
        this.size = null;
        this.base = null;
        this.proteins = [];
        this.ingredients = [];
        
        // Valid values - could be moved to constants
        this.validSizes = ['S', 'M', 'L'];
        this.validBases = ['White Rice', 'Brown Rice', 'Quinoa', 'Salad'];
        this.maxProteins = { 'S': 1, 'M': 2, 'L': 3 };
        this.maxIngredients = { 'S': 4, 'M': 4, 'L': 6 };
    }
    
    // Validate and set size
    setSize(size) {
        if (!this.validSizes.includes(size)) {
            throw new Error(`Invalid size: ${size}. Valid sizes are: ${this.validSizes.join(', ')}`);
        }
        this.size = new Size(size);
        return this; // For method chaining
    }
    
    // Similar validation for other setters...
    
    // Validate number of proteins based on bowl size
    setProteins(proteins) {
        if (!this.size) {
            throw new Error('Please set bowl size before adding proteins');
        }
        
        const maxAllowed = this.maxProteins[this.getSize()];
        if (proteins.length > maxAllowed) {
            throw new Error(`Maximum ${maxAllowed} proteins allowed for size ${this.getSize()}`);
        }
        
        this.proteins = proteins.map(p => new Protein(p));
        return this;
    }
    
    // For better accessibility/serialization
    toJSON() {
        return {
            size: this.size ? this.size.getSize() : null,
            base: this.base ? this.base.getBase() : null,
            proteins: this.proteins.map(p => p.getProtein()),
            ingredients: this.ingredients.map(i => i.getIngredient())
        };
    }
}

*/


// SIZE CLASS
export class Size {
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
export class Base {
    constructor(baseName) {
        this.baseName = baseName;
    }

    getBase() {
        return this.baseName;
    }
}

// PROTEIN CLASS
export class Protein {
    constructor(proteinName) {
        this.proteinName = proteinName;
    }

    getProtein() {
        return this.proteinName;
    }
}

// INGREDIENT CLASS
export class Ingredient {
    constructor(ingredientName) {
        this.ingredientName = ingredientName;
    }

    getIngredient() {
        return this.ingredientName;
    }
}