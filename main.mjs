function Container () {
    this.bowlsList = [];

    function Bowl (size, base) {
        this.size = size;
        this.base = base;
        this.proteins = [];
        this.ingredients = [];
        
        this.getSize = function () {
            return this.size;
        }

        this.getBase = function () {
            return this.base;
        }

        this.addProtein = function (protein) {
            this.proteins.push(protein);
        }
    
        this.addIngredient = function (ingredient) {
            this.ingredients.push(ingredient);
        }
    }

    this.addBowl = function (size, base) {
        const bowl = new Bowl(size, base);
        this.bowlsList.push(bowl);
        console.log(bowl)
        //return bowl;
    }

    this.getBowl = function (size, base) {
        const matchingBowls = [];

        for (const bowl in this.bowlsList) {
            console.log(bowl.getSize())
            if (bowl.size === size && bowl.base === base) {
                matchingBowls.push(bowl);
            }
        }
        return matchingBowls;
    }
}

const container =  new Container();
container.addBowl('S', 'white rice');
container.addBowl('M', 'white rice');
container.addBowl('L', 'black rice');
container.addBowl('S', 'white rice');

console.log(container.getBowl('S', 'white rice'));