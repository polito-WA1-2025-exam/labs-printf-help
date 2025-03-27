// User list retrieval
export function retrieveUsersList (db) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * 
                    FROM users`;

        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows);
            }
        });
    });
}

// Authenticate user by email or username and password
export function getUser(db, field, value, password) {
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

export function getUserBy(db, field, value) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM users WHERE ${field} = ?`;
  
      db.get(sql, [value], (err, row) => {
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