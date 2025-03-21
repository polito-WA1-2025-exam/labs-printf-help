import express from 'express'
import { check } from 'express-validator';
import morgan from 'morgan';
import sqlite from 'sqlite3'

import * as query from './query.mjs';
import { User } from './user.mjs';

const app = express() ;
const port = 3000;
const db = new sqlite.Database('../databases/testDB.db', (err) => {
    if (err) {
        console.error(err.message)
    }
    else {
        console.log('Connected to the testDB database.')
    }
});

app.use(express.json())
app.use(morgan('dev'))


// Define routes and web pages
app.get('/user', (req, res) => {
    query.listUsers(db)
    .then((result) => {
        res.json(result)
        res.status(200).end()
    })
    .catch((err) => {
        console.error(err)
        res.status(500).end()
    })
});

app.get('/user/email/:email/password/:password', [
        check('email').isEmail()
    ], (req, res) => {
    const email = req.params.email
    const password = req.params.password

    query.findUserByEmailAndPassword(db, email, password)
    .then((result) => {
        if (result) {
            res.json(result)
            res.status(200).end()
        }
        else {
            res.status(404).end()
        }
    })
    .catch((err) => {
        console.error(err)
        res.status(500).end()
    })
});

app.post('/user', [
        check('username').isString(),
        check('email').isEmail(),
        check('password').isLength({min: 8})
    ], (req, res) => {
    const user = new User(req.body.username, req.body.email, req.body.password);
    
    query.addUser(db, user)
    .then(() => {
        console.log('User added successfully');
        res.status(200).end()
    })
    .catch((err) => {
        console.error(err)
        res.status(500).end()
    })
});

app.get('/bowls', (req, res) => {
    query.listBowls(db)
    .then((result) => {
        result.forEach(item => console.log(JSON.stringify(item)));
        res.status(200).end()
    })
    .catch((err) => {
        console.error(err)
        res.status(501).end()
    })
});

app.get('/', (req, res) =>	res.send('Hello World!')) ;

app.get('/user', (req, res) => {
    let u = { name: 'Fulvio', id:123 }
    res.json(u)
})

app.listen(port, () =>	console.log('Server	ready')) ;

// TEMPLATES

// app.get('/user/:id/name', (req, res) => {
//     const id = req.params.id 

//     res.json({"id": id, "name": "Tom"})
// })

// // Activate server