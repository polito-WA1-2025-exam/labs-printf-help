export function retrieveOrdersList (db) {
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

export function retrieveOrdersByUser (db, userID) {
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

export function addOrder (db, order) {
    return new Promise ((resolve, reject) => {
        const ordersSql = `INSERT INTO orders (userID, total, appliedDiscount) 
                    VALUES (?, ?, ?)`;
        const bowlsSql = `INSERT INTO bowls (orderID, base, proteins, ingredients, price)
                    VALUES (?, ?, ?, ?, ?)`;

        console.log(order.getUserID())
        db.run(ordersSql, [order.getUserID(), order.getTotal(), order.getAppliedDiscount()], function(err) {
            if (err) {
                reject(new Error("Error inserting order: " + err.message));
            } else {
                const orderId = this.lastID; // Get the last inserted order ID
                const bowls = order.getBowls();

                bowls.forEach((bowl) => {
                    db.run(bowlsSql, [orderId, bowl.base, JSON.stringify(bowl.proteins), JSON.stringify(bowl.ingredients), bowl.price], function(err) {
                        if (err) {
                            reject(new Error("Error inserting bowl: " + err.message));
                        }
                        else {
                            resolve();  // Successfully added the order and bowls
                        }
                    });
                })
            }
        })
    })
}