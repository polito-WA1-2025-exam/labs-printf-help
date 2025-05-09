import { validationResult } from 'express-validator';

import * as userQueries from '../queries/userQueries.mjs';
import * as genericQueries from '../queries/genericQueries.mjs';

// import {User} from '../../type/user.mjs';

export function getUsers (req, res) {
    const db = genericQueries.connectDB();

    userQueries.retrieveUsersList(db)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        console.error(err)
        res.status(500)
    })
    .finally(() => {
        genericQueries.closeDB(db);
    });
}

export function getUserById(req, res) {
    const db = genericQueries.connectDB();
    const { id } = req.params;

    console.log("id in controller: " + id);

    // Using the getUserBy query by passing 'id' as field
    userQueries.getUserBy(db, 'id', id)
    .then((user) => {
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send('User not found');
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    })
    .finally(() => {
        genericQueries.closeDB(db);
    });
}

export function authenticateUser (req, res) {
    const { identifier, password } = req.query;
        const db = genericQueries.connectDB();

        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        // Check if email or username is provided
        if (!identifier) {
            return res.status(400).send('Email or username is required to login');
        }
    
        // Check if password is provided
        if (!password) {
            return res.status(400).send('Password is required to login');
        }
        
        // Select the search field based on the input
        const searchField = identifier.includes('@') ? 'email' : 'username';
    
        userQueries.getUser(db, searchField, identifier, password)
        .then((user) => {
            if (user) {
                res.status(200).json(user);  // Successfully authenticated
            } else {
                res.status(404).send('Invalid credentials');  // Authentication failed
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        })
        .finally(() => {
            genericQueries.closeDB(db);
        })
}

// export function postUser (req, res) {
//     const db = genericQueries.connectDB();
//     const errors = validationResult(req);
    
//     // Check validation errors
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     // Create a new user object
//     const user = new User(req.body.username, req.body.email, req.body.password);

//     // Add the user to the database
//     userQueries.addUser(db, user)
//     .then(() => {
//         console.log('User added successfully');
//         res.status(201).send('User created');
//     })
//     .catch((err) => {  
//         console.error(err);

//         // Check for specific error messages and return appropriate response
//         if (err.message === 'Username already taken' || err.message === 'Email already in use') {
//             res.status(409).send(err.message);
//         } else {
//             res.status(500).send('Internal Server Error');
//         }
//     })
//     .finally(() => {
//         genericQueries.closeDB(db);
//     });
// }

// export function deleteUser (req, res) {
//     const db = genericQueries.connectDB();

//     const user = new User(req.body.username, req.body.email, req.body.password);

//     userQueries.delUser(db, user)
//     .then(() => {
//         console.log('User deleted successfully');
//         res.status(200).end()
//     })
//     .catch((err) => {
//         console.error(err);
        
//         // Check for specific error messages and return them to the client
//         if (err.message === 'User not found or parameters are incorrect') {
//             res.status(404).send('User not found or incorrect parameters');
//         } else {
//             res.status(500).send('Internal Server Error');
//         }
//     })
//     .finally(() => {
//         genericQueries.closeDB(db);
//     })
// }