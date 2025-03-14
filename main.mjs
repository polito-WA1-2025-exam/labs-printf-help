import { Bowl, Size, Base, Protein, Ingredient } from "./bowls.mjs";
import sqlite from 'sqlite3';
import dayjs from 'dayjs';

class Container {
    constructor() {
        this.orders = []; // List of all bowls
    }

    // Aggiunge i metodi al prototype di Container 
    createBowlObj() {
        return new Bowl();
    }

    addBowl(bowl) {
        this.orders.push(bowl);
    }

    submitOrder(db) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO orders (size, base, proteins, ingredients, order_date)
                        VALUES (?, ?, ?, ?, ?)`;    

            this.orders.forEach(bowl => {
                db.run(
                    sql, 
                    [
                        bowl.getSize(), 
                        bowl.getBase(), 
                        bowl.getProteins().map(protein => protein.getProtein()), 
                        bowl.getIngredients().map(ingredient => ingredient.getIngredient()), 
                        dayjs().format('YYYY-MM-DD HH:mm:ss')
                    ], 
                    function(err) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve();
                        }
                    }
                );
            });
        });
    }

    // // Metodi commentati
    // getFilter(size, base) {
    //     return [...this.orders].filter(x => x.getBase() === base && x.getSize() === size);
    // }

    // sortBySize() {
    //     return [...this.orders].sort((a, b) => b.getSize().localeCompare(a.getSize()));
    // }

    // getBowlsList() {
    //     return [...this.orders];
    // }

    // getBowlbyID(id) {
    //     return [...this.orders].find(x => x.id === id);
    // }

    // deleteBowl(id) {
    //     this.orders = this.orders.filter(bowl => bowl.id !== id);
    // }
}

const container = new Container();         // Create a new container object

// Add bowls to the container
const bowl1 = container.createBowlObj();

bowl1.setSize('L');
bowl1.setBase('White Rice');
bowl1.setProteins(['Chicken', 'Beef']);
bowl1.setIngredients(['Tomato', 'Lettuce', 'Onion', 'Cucumber']);
bowl1.displayContents();

container.addBowl(bowl1);

const db = new sqlite.Database('orders.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the orders database.');
}); 

// Commenta questa riga se non sei pronto a inviare l'ordine
container.submitOrder(db).then(() => {
    console.log('Order submitted successfully');
}
).catch((err) => {
    console.error(err);
});

// Crea un nuovo Bowl direttamente dalla classe importata
console.log()
let b = new Bowl();
b.setSize('L');
b.setBase('White Rice');
b.setProteins(['Chicken', 'Beef']);
b.setIngredients(['Tomato', 'Lettuce', 'Onion', 'Cucumber']);
b.displayContents();