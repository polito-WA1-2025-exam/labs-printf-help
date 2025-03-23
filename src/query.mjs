import {Bowl} from "./bowl.mjs";
import {User} from "./user.mjs";

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

export function filterOrdersBySize(db, size) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * 
                    FROM bowlsPerOrder
                    WHERE size = ?`;
        db.all(sql, [size], (err, rows) => {
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

export function findUserByEmailAndPassword (db, email, password) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT *
                    FROM users
                    WHERE email = ? AND password = ?`;

        db.get(sql, [email, password], (err, row) => {
            if (err) {
                reject(err);
            }
            else {
                if (row) {
                    const user = new User(row.username, row.email, row.password, row.creationDate);
                    resolve(user);
                }
                else {
                    resolve(null);
                }
            }
        })
    })
}

export function addUser (db, user) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO users (username, email, password) 
                    VALUES (?, ?, ?)`;

        db.run(sql, [user.getUsername(), user.getEmail(), user.getPassword()], function(err) {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}

export function addUserWithCheck(db, user) {
    return new Promise((resolve, reject) => {
        // Check if the username already exists
        const checkUsernameSql = `SELECT 1 FROM users WHERE username = ? LIMIT 1`;
        db.get(checkUsernameSql, [user.getUsername()], (err, row) => {
            if (err) {
                reject(err);
            } else if (row) {
                // If a row is returned, the username already exists
                reject(new Error('Username already taken'));
            } else {
                // If the username is available, check if the email already exists
                const checkEmailSql = `SELECT 1 FROM users WHERE email = ? LIMIT 1`;
                db.get(checkEmailSql, [user.getEmail()], (err, row) => {
                    if (err) {
                        reject(err);
                    } else if (row) {
                        // If a row is returned, the email already exists
                        reject(new Error('Email already in use'));
                    } else {
                        // Insert the new user if both username and email are available
                        const insertSql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
                        db.run(insertSql, [user.getUsername(), user.getEmail(), user.getPassword()], function(err) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve();  // Successfully added the user
                            }
                        });
                    }
                });
            }
        });
    });
}




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

/*
export function listOrders (db) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM orders`;

        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                const result = rows.map(item => new Order(item.id, item.user, item.email, item.password, item.created_at));
                resolve(result);
            }
        });
    });
}*/

export function listBowls (db) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM bowlsPerOrder`;

        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                const result = rows.map(item => new Bowl(item.size, item.base, item.proteins, item.ingredients));
                resolve(result);
            }
        });
    });
}