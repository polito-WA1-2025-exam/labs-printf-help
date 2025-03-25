import {Bowl} from "./bowl.mjs";
import * as query from './api/controllers/query.mjs';
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
            const sql = `INSERT INTO bowlsPerOrder (userId, orderId, size, base, proteins, ingredients) 
                        VALUES (1, 1, ?, ?, ?, ?)`;    

            this.orders.forEach(bowl => {
                db.run(sql, [bowl.getSize().getSize(), bowl.getBase(),  bowl.getProteins().toString(), bowl.getIngredients().toString()], function(err) {
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
}

const container = new Container();         // Create a new container object

const db = new sqlite.Database('../databases/testDB.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    else {
        console.log('Connected to the database.');
    }
});

// query.displayOrders(db).then((result) => {
//     result.forEach(item => item.displayContents());
// }).catch(err => {
//     console.error(err);
// });

// query.filterOrdersBySize(db, 'S').then((result) => {
//     console.log('Number of order matching the size: ' + result.length);
//     result.forEach(item => item.displayContents());
// }).catch(err => {
//     console.error(err);
// });