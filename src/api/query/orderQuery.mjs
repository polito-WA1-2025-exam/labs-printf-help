import { Order } from "../../type/order.mjs";

export function getOrders (db) {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT * 
                    FROM orders`;
        
        db.all(sql, (err,rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}

export function getOrdersByUser (db, userID) {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT * 
                    FROM orders
                    WHERE userID = ?`;
        
        db.all(sql, [userID], (err,rows) => {
            if (err) {
                reject(err);
            } else {
                if (rows.length === 0) {
                    resolve(null);
                }
                else {
                    resolve(rows);
                }
            }
        })
    })
}

export function addOrder (db, req) {

    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO orders (userID, total, appliedDiscount) 
                    VALUES (?, ?, ?)`;

        db.run(sql, [req.userID, req.total, req.appliedDiscount], function(err) {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}