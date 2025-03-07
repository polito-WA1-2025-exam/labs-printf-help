function Container () {
    this.bowlsId = 1;                   // Incremental ID for each bowl
    this.bowlsList = [];                // List of all bowls

    function Bowl (id, size, base) {
        this.id = id;                   // ID of the bowl
        this.size = new Size(size);     // Size of the bowl
        this.base = new Base(base);     // Base of the bowl
        this.proteins = [];             // List of proteins in the bowl
        this.ingredients = [];          // List of ingredients in the bowl
        
        
        this.getSize = function () {
            return this.size.getSize();
        }

        this.getBase = function () {
            return this.base.getBase();
        }

        this.getProteins = function () {
            return [...this.proteins];
        }

        this.getIngredients = function () {
            return [...this.ingredients];
        }

        this.addProtein = function (protein) {
            if ((this.proteins.length < this.size.returnSize())) {
                this.proteins.push(new Protein(protein));
            } else {
                console.log('Max number of proteins reached');
            }
        }
    
        this.addIngredient = function (ingredient) {
            if ((this.size.getSize() === 'L' && this.ingredients.length < 6) || (this.ingredients.length < 4)) {
                this.ingredients.push(new Ingredient(ingredient));
            } else {
                console.log('Max number of ingredients reached');
            }
        }

        this.getContents = function () {
            return [...this.proteins, ...this.ingredients];
        }
    }

    function Size (sizeType) {
        this.sizeType = sizeType;
        this.converter = {3: 'L', 2: 'M', 1: 'S'};

        this.getSize = function () {
            return this.sizeType;
        }
        
        // Function to facilitate the return of the size in number format
        this.returnSize = function () {
            return this.converter[this.sizeType];
        }
    }

    function Base (baseName) {
        this.baseName = baseName;

        this.getBase = function () {
            return this.baseName;
        }
    }

    function Protein (proteinName) {
        this.proteinName = proteinName;

        this.getProtein = function () {
            return this.proteinName;
        }
    }

    function Ingredient (ingredientName) {
        this.ingredientName = ingredientName;

        this.getIngredient = function () {
            return this.ingredientName;
        }
    }
    
    this.addBowl = function (size, base) {
        const bowl = new Bowl(this.bowlsId, size, base);

        this.bowlsId++;
        this.bowlsList.push(bowl);
        
        return bowl;
    }

    // Function to filter the bowls by size and base
    this.getFilter = function (size, base){
        //hello
        return [...this.bowlsList].filter(x=>x.getBase()===base && x.getSize()===size);
    }

    this.sortBySize = function (){
        return [...this.bowlsList].sort((a, b) => b.getSize().localeCompare(a.getSize()));
    }

    this.getBowlsList = function () {
        return [...this.bowlsList];
    }

    this.getBowlbyID = function (id) {
        return [...this.bowlsList].find(x=>x.id===id);
    }

    // Function to delete a bowl by ID
    this.deleteBowl = function (id) {
        this.bowlsList = this.bowlsList.filter(bowl => bowl.id !== id);
    }
}

const container =  new Container();         // Create a new container object

// Add bowls to the container
const myBowl = container.addBowl('S', 'white rice');        // Test bowl
container.addBowl('M', 'black rice');
container.addBowl('L', 'salad');
container.addBowl('S', 'white rice');

// Add proteins and ingredients to the test bowl
myBowl.addProtein('chicken');
myBowl.addProtein('beef');            // Test for max number of proteins reached
myBowl.addIngredient('lettuce');
myBowl.addIngredient('tomato');
myBowl.addIngredient('corn');
myBowl.addIngredient('cheese');
myBowl.addIngredient('croutons');           // Test for max number of ingredients reached

console.log('====================\nFiltering function projection\n====================');
console.log(container.getFilter('S', 'white rice'));        // Filter function test

console.log('====================\nSorting the bowls\n====================');
console.log(container.sortBySize());        // Sort function test

console.log('====================\nBowls list retrival\n====================');
const temp = container.getBowlsList()
console.log(temp[0].getContents());

console.log('====================\nBowl selection by ID\n====================');
console.log(container.getBowlbyID(3));

// Delete a bowl by ID
console.log('====================\nDelete functionality\n====================');
container.deleteBowl(3);
console.log(container.getBowlsList()); 