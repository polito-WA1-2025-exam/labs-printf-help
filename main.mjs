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
            const sql = `INSERT INTO orders (user_id, order_contents)
                        VALUES (1, ?)`;    

            this.orders.forEach(bowl => {
                db.run(sql, JSON.stringify(bowl.toJSON()), function(err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    }

    displayOrders(db) {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM orders`, (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    
                    resolve();
                }
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

const bowl = container.createBowlObj();

bowl.setSize('M');
bowl.setBase('Brown Rice');
bowl.setProteins(['Chicken', 'Beef']);
bowl.setIngredients(['Lettuce', 'Cucumber', 'Tomato']);
bowl.displayContents();