import sqlite from 'sqlite3'

// import {Bowl} from "../../type/bowl.mjs";
// import { Order } from "../../type/order.mjs";

export function connectDB () {
    return new sqlite.Database('databases/pokeBowl.db', (err) => {
        if (err) {
            console.error(err.message)
        }
        else {
            console.log('Connected to the database.')
        }
    })
}

export function closeDB (db) {
    db.close((err) => {
        if (err) {
            console.error(err.message)
        }
        else {
            console.log('Closed the database connection.')
        }
    })
}

// export function displayOrders(db) {
//     return new Promise((resolve, reject) => {
//         db.all(`SELECT * FROM bowlsPerOrder`, (err, rows) => {
//             if (err) {
//                 reject(err);
//             }
//             else {
//                 const result = rows.map(item => {
//                     const bowl = new Bowl();

//                     bowl.setSize(item.size);
//                     bowl.setBase(item.base);
//                     bowl.setProteins(item.proteins.split(','));
//                     bowl.setIngredients(item.ingredients.split(','));

//                     return bowl;
//                 })

//                 resolve(result);
//             }
//         });
//     });
// }

// /*-------------------------------------------*/
// //               ORDERS QUERIES
// /*-------------------------------------------*/

// export function listBowls (db) {
//     return new Promise((resolve, reject) => {
//         const sql = `SELECT * FROM bowlsPerOrder`;
        
//         db.all(sql, (err, rows) => {
//             if (err) {
//                 reject(err);
//             }
//             else {
//                 console.log("rows: ", rows);
//                 const result = rows.map(item => new Bowl(item.size, item.base, item.proteins, item.ingredients));
//                 console.log("result: ", result);
//                 resolve(result);
//             }
//         });
//     });
// }


// export function listOrders (db) {
//     return new Promise((resolve, reject) => {
//         const sql = `SELECT * FROM orders`;
        
//         db.all(sql, (err, rows) => {
//             if (err) {
//                 reject(err);
//             }
//             else {
//                 console.log("rows: ", rows);
//                 const result = rows.map(item => new Order({orderId:item.id, userID:item.userID, orderDate:item.orderDate, total:item.total, appliedDiscount:item.appliedDiscount}));
//                 console.log("result: ", result);
//                 resolve(result);
//             }
//         });
//     });
// }
// export function listDiscountedOrders (db) {
//     return new Promise((resolve, reject) => {
//         const sql = `SELECT * FROM orders WHERE appliedDiscount = 'TRUE'`;
//         //TODO: fix the database: boolean values are stored as strings
//         db.all(sql, (err, rows) => {
//             if (err) {
//                 reject(err);
//             }
//             else {
//                 console.log("rows: ", rows);
//                 const result = rows.map(item => new Order(item.id, item.userID, item.orderDate, item.total, item.appliedDiscount));
//                 console.log("result: ", result);
//                 resolve(result);
//             }
//         });
//     });
// }

// export function getBowlsByUser(db, field, value, password) {
//     return new Promise((resolve, reject) => {
//         const sql = `SELECT id FROM users WHERE ${field} = ? AND password = ?`;
//         db.get(sql, [value, password], (err, row) => {
//             if (err) {
//                 reject(err);
//             } else if (row) {
//                 const sql = `SELECT * FROM bowlsPerOrder WHERE userId = ?`;
//                 db.all(sql, [row.id], (err, rows) => {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         const result = rows.map(item => new Bowl(item.size, item.base, item.proteins, item.ingredients));
//                         resolve(result);
//                     }
//                 });
//             } else {
//                 resolve(null);
//             }
//         });
//         /*
//         db.get(sql, [value, password], (err, row) => {
//         if (err) {
//           reject(err);  // If there's an error with the query, reject the promise
//         } else if (row) {
//           resolve(row);  // User found, resolve the promise with the user data
//         } else {
//           resolve(null);  // No user found, resolve with null
//         }
//       });*/
//     });
// }
    
// export function delOrder(db, id) {
//     return new Promise((resolve, reject) => {
//         const sql = `DELETE FROM orders WHERE id = ?`;
//         db.run(sql, [id], function(err) {
//             if (err) {
//                 reject(err);
//             } else if (this.changes === 0) {
//                 reject(new Error('Order not found'));
//             } else {
//                 resolve();
//             }
//         });
//     });
// }

// export function addBowl(db, bowl, userId, orderId) {
//     return new Promise((resolve, reject) => {
//         const sql = `INSERT INTO bowlsPerOrder (userId, orderId, size, base, proteins, ingredients, price) 
//                     VALUES (?, ?, ?, ?, ?, ?, ?)`;

//         db.run(sql, [userId, orderId, bowl.getSize(), bowl.getBase(), bowl.toString("proteins"), bowl.toString("ingredients"), bowl.getPrice()], function(err) {
//             if (err) {
//                 reject(err);
//             }
//             else {
//                 resolve();
//             }
//         });
//     });S
// }

// export function delBowl(db, id) {
//     return new Promise((resolve, reject) => {
//         const sql = `DELETE FROM bowlsPerOrder WHERE id = ?`;
//         db.run(sql, [id], function(err) {
//             if (err) {
//                 reject(err);
//             } else if (this.changes === 0) {
//                 reject(new Error('Bowl not found'));
//             } else {
//                 resolve();
//             }
//         });
//     });
// }

// export function delBowlByOrder(db, id) {
//     return new Promise((resolve, reject) => {
//         const sql = `DELETE FROM bowlsPerOrder WHERE orderId = ?`;
//         console.log("id: ", id);
//         db.run(sql, [id], function(err) {
//             if (err) {
//                 reject(err);
//             } else if (this.changes === 0) {
//                 reject(new Error('Order not found'));
//             } else {
//                 resolve();
//             }
//         });
//     });
// }