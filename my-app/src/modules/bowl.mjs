// BOWL CLASS
class Bowl {
    constructor(localId, size, base, proteins, ingredients) {
        this.localId = localId; // Local ID for the bowl
        this.size = size; // Size of the bowl
        this.base = base; // Base of the bowl
        this.proteins = proteins; // List of proteins in the bowl
        this.ingredients = ingredients; // List of ingredients in the bowl
        this.price; // Price of the bowl
    }

    getLocalId() {
        return this.localId;
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

        if (this.proteins === null) {
            return list;
        }

        this.proteins.forEach(protein => {
            list.push(protein.getProtein());
        });

        return list;
    }

    getIngredients() {
        let list = [];

        if (this.ingredients === null) {
            return list;
        }

        this.ingredients.forEach(ingredients => {
            list.push(ingredients.getIngredient());
        });

        return list;
    }

    setPrice(price) {
        this.price = price;
    }

    setSize(size) {
        this.size = size;
    }

    setBase(base) {
        this.base = base;
    }

    setProteins(proteins) {
        this.proteins = []; // Reset proteins before adding new ones
        proteins.forEach(protein => {
            this.proteins.push(protein);
        });
    }

    setIngredients(ingredients) {
        this.ingredients = []; // Reset ingredients before adding new ones
        ingredients.forEach(ingredient => {
            this.ingredients.push(ingredient);
        });
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
            size: this.size,
            base: this.base,
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

// // SIZE CLASS
// class Size {
//     constructor(sizeType) {
//         this.sizeType = sizeType;
//         this.converter = { 'L': 3, 'M': 2, 'S': 1 };
//     }

//     getSize() {
//         return this.sizeType;
//     }

//     // Function to facilitate the return of the size in number format
//     getMaxProteins() {
//         return this.converter[this.sizeType];
//     }

//     getMaxIngredients() {
//         if (this.sizeType === "L") {
//             return 6;
//         }
//         return 4;
//     }
// }

// // BASE CLASS
// class Base {
//     constructor(baseName) {
//         this.baseName = baseName;
//     }

//     getBase() {
//         return this.baseName;
//     }
// }

// // PROTEIN CLASS
// class Protein {
//     constructor(proteinName) {
//         this.proteinName = proteinName;
//     }

//     getProtein() {
//         return this.proteinName;
//     }
// }

// // INGREDIENT CLASS
// class Ingredient {
//     constructor(ingredientName) {
//         this.ingredientName = ingredientName;
//     }

//     getIngredient() {
//         return this.ingredientName;
//     }
// }

export default Bowl;