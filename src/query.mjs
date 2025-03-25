import {Bowl} from "./bowl.mjs";
import {User} from "./user.mjs";
import { Order } from "./order.mjs";

export function displayOrders(db) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM bowlsPerOrder`, (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                const result = rows.map(item => {
                    const bowl = new Bowl();

                    bowl.setSize(item.size);
                    bowl.setBase(item.base);
                    bowl.setProteins(item.proteins.split(','));
                    bowl.setIngredients(item.ingredients.split(','));

                    return bowl;
                })

                resolve(result);
            }
        });
    });
}

/*-------------------------------------------*/
//               USER QUERIES
/*-------------------------------------------*/

// User list retrieval
export function listUsers (db) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * 
                    FROM users`;

        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                const result = rows.map(item => new User(item.username, item.email, item.password, item.creationDate))
                resolve(result);
            }
        });
    });
}

// Authenticate user by email or username and password
export function authenticateUser(db, field, value, password) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM users WHERE ${field} = ? AND password = ?`;
  
      db.get(sql, [value, password], (err, row) => {
        if (err) {
          reject(err);  // If there's an error with the query, reject the promise
        } else if (row) {
          resolve(row);  // User found, resolve the promise with the user data
        } else {
          resolve(null);  // No user found, resolve with null
        }
      });
    });
}

// Creation of a new user
export function addUser(db, user) {
    return new Promise((resolve, reject) => {
        // Check if the username already exists
        usernameCheck(db, user.getUsername())
        .then((exist) => {
            if (exist) {
                reject(new Error('Username already taken'));
            } else {
                // Check if the email already exists
                emailCheck(db, user.getEmail())
                .then((exist) => {
                    if (exist) {
                        reject(new Error('Email already in use'));
                    } else {
                        // Insert the new user if both username and email are available
                        const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
                        db.run(sql, [user.getUsername(), user.getEmail(), user.getPassword()], function(err) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve();  // Successfully added the user
                            }
                        });
                    }
                })
                .catch((err) => {
                    reject(err);
                });
            }
        })
        .catch((err) => {
            reject(err);
        });
    });
}

function usernameCheck (db, username) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT 1 
                    FROM users 
                    WHERE username = ? 
                    LIMIT 1`
        
        db.get(sql, [username], (err, row) => {
            if (err) {
                reject(err);
            } else if (row) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    })
}

function emailCheck (db, email) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT 1 
                    FROM users 
                    WHERE email = ? 
                    LIMIT 1`
        
        db.get(sql, [email], (err, row) => {
            if (err) {
                reject(err);
            } else if (row) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    })
}

// Deletion of a user
export function delUser (db, user) {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM users
                     WHERE username = ? AND email = ? AND password = ?`;

        db.run(sql, [user.getUsername(), user.getEmail(), user.getPassword()], function(err) {
            if (err) {
                reject(err);
            } else if (this.changes === 0) {
                // If no rows were deleted, that means the user does not exist
                reject(new Error('User not found or parameters are incorrect'));
            }else {
                resolve();
            }
        });
    });
}

/*-------------------------------------------*/
//               ORDERS QUERIES
/*-------------------------------------------*/

export function addOrder (db, order) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO orders (userID, total, appliedDiscount) 
                    VALUES (?, ?, ?)`;
        console.log("order: ", order.getAppliedDiscount());
        db.run(sql, [order.getUserID(), order.getTotal(), order.getAppliedDiscount()], function(err) {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}

export function listBowls (db) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM bowlsPerOrder`;
        
        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                console.log("rows: ", rows);
                const result = rows.map(item => new Bowl(item.size, item.base, item.proteins, item.ingredients));
                console.log("result: ", result);
                resolve(result);
            }
        });
    });
}


export function listOrders (db) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM orders`;
        
        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                console.log("rows: ", rows);
                const result = rows.map(item => new Order({orderId:item.id, userID:item.userID, orderDate:item.orderDate, total:item.total, appliedDiscount:item.appliedDiscount}));
                console.log("result: ", result);
                resolve(result);
            }
        });
    });
}
export function listDiscountedOrders (db) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM orders WHERE appliedDiscount = 'TRUE'`;
        //TODO: fix the database: boolean values are stored as strings
        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                console.log("rows: ", rows);
                const result = rows.map(item => new Order(item.id, item.userID, item.orderDate, item.total, item.appliedDiscount));
                console.log("result: ", result);
                resolve(result);
            }
        });
    });
}

export function getBowlsByUser(db, field, value, password) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT id FROM users WHERE ${field} = ? AND password = ?`;
        db.get(sql, [value, password], (err, row) => {
            if (err) {
                reject(err);
            } else if (row) {
                const sql = `SELECT * FROM bowlsPerOrder WHERE userId = ?`;
                db.all(sql, [row.id], (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        const result = rows.map(item => new Bowl(item.size, item.base, item.proteins, item.ingredients));
                        resolve(result);
                    }
                });
            } else {
                resolve(null);
            }
        });
        /*
        db.get(sql, [value, password], (err, row) => {
        if (err) {
          reject(err);  // If there's an error with the query, reject the promise
        } else if (row) {
          resolve(row);  // User found, resolve the promise with the user data
        } else {
          resolve(null);  // No user found, resolve with null
        }
      });*/
    });
}
    
export function delOrder(db, id) {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM orders WHERE id = ?`;
        db.run(sql, [id], function(err) {
            if (err) {
                reject(err);
            } else if (this.changes === 0) {
                reject(new Error('Order not found'));
            } else {
                resolve();
            }
        });
    });
}

export function addBowl(db, bowl, userId, orderId) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO bowlsPerOrder (userId, orderId, size, base, proteins, ingredients, price) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)`;

        db.run(sql, [userId, orderId, bowl.getSize(), bowl.getBase(), bowl.toString("proteins"), bowl.toString("ingredients"), bowl.getPrice()], function(err) {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });S
}

export function delBowl(db, id) {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM bowlsPerOrder WHERE id = ?`;
        db.run(sql, [id], function(err) {
            if (err) {
                reject(err);
            } else if (this.changes === 0) {
                reject(new Error('Bowl not found'));
            } else {
                resolve();
            }
        });
    });
}

export function delBowlByOrder(db, id) {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM bowlsPerOrder WHERE orderId = ?`;
        console.log("id: ", id);
        db.run(sql, [id], function(err) {
            if (err) {
                reject(err);
            } else if (this.changes === 0) {
                reject(new Error('Order not found'));
            } else {
                resolve();
            }
        });
    });
}