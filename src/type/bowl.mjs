// BOWL CLASS
export class Bowl {
    constructor(size, base, proteins, ingredients, price) {
        this.size = new Size(size); // Size of the bowl
        this.base = new Base (base); // Base of the bowl
        // Handle both string and array inputs for proteins
        this.proteins = typeof proteins === 'string' 
        ? proteins.split(",")
        : proteins;

        // Handle both string and array inputs for ingredients
        this.ingredients = typeof ingredients === 'string' 
        ? ingredients.split(",")
        : ingredients;
        this.price = price;
    }

    getPrice() {
        return this.price;
    }
    getSize() {
        return this.size; //.getSize();
    }

    getBase() {
        return this.base; //.getBase();
    }

    getProteins() {
        let list = [];

        this.proteins.forEach(protein => {
            list.push(protein.getProtein());
        });

        return list;
    }

    getIngredients() {
        let list = [];

        this.ingredients.forEach(ingredients => {
            list.push(ingredients.getIngredient());
        });

        return list;
    }

    setPrice(price) {
        this.price = price;
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
        console.log('Proteins: ' + this.getProteins());
        console.log('Ingredients: ' + this.getIngredients());
    }

    fromJSON(json) {
        this.size = json.size;
        this.base = json.base;
        this.proteins = json.proteins;
        this.ingredients = json.ingredients;
        this.price = json.price;
    }

    toJSON() {
        return {
            size: this.size.getSize(),
            base: this.base.getBase(),
            proteins: this.proteins,
            ingredients: this.ingredients,
            price: this.price
        };
    }

    toString(choice) {
        if (choice === "proteins") {
            return this.proteins.join(",");
        }else if (choice === "ingredients") {
            return this.ingredients.join(",");
        }
        else return null;
    }
}

// SIZE CLASS
class Size {
    constructor(sizeType) {
        this.sizeType = sizeType;
        this.converter = { 'L': 3, 'M': 2, 'S': 1 };
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