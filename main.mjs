function Container () {
    this.bowlsId = 1;                   // increID for each bowl
    this.bowlsList = [];

    function Bowl (id, size, base) {
        this.id = id;
        this.size = new Size(size);
        this.base = new Base(base);
        this.proteins = [];
        this.ingredients = [];
        
        
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

    this.getFilter = function (size, base){
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

    this.deleteBowl = function (id) {
        this.bowlsList = this.bowlsList.filter(bowl => bowl.id !== id);
    }
}

const container =  new Container();

const myBowl = container.addBowl('S', 'white rice');
container.addBowl('M', 'black rice');
container.addBowl('L', 'salad');
container.addBowl('S', 'white rice');

myBowl.addProtein('chicken');
myBowl.addProtein('beef');            // Test for max number of proteins reached
myBowl.addIngredient('lettuce');
myBowl.addIngredient('tomato');
myBowl.addIngredient('corn');
myBowl.addIngredient('cheese');
myBowl.addIngredient('croutons');           // Test for max number of ingredients reached

console.log(container.sortBySize());        // Sort function test

const temp = container.getBowlsList()
console.log(temp[0].getContents());

console.log(container.getBowlbyID(3));


//container.deleteBowl(3);
console.log(container.getBowlsList());