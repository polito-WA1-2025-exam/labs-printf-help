import express from 'express'
import { validationResult, check } from 'express-validator';
import morgan from 'morgan';
import sqlite from 'sqlite3'

import * as query from './api/query/genericQuery.mjs';
import * as userQuery from './api/query/userQuery.mjs';
import * as orderQuery from './api/query/orderQuery.mjs';
import { User } from './type/user.mjs';
import { Order } from './type/order.mjs';
import { Bowl } from './type/bowl.mjs';

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


/*-------------------------------------------*/
//                USER ROUTES
/*-------------------------------------------*/

// User list retrieval

app.get('/users', (req, res) => {
    userQuery.getUsers(db)
    .then((result) => {
        res.json(result)
        res.status(200).end()
    })
    .catch((err) => {
        console.error(err)
        res.status(500).end()
    })
});

// User retrieval by email or username and password

app.get('/user/authenticate', [
        check('identifier').isString().withMessage('Invalid email or username'),
        check('password').isString().withMessage('Invalid password')
], (req, res) => {
    const { identifier, password } = req.query;
    
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

    userQuery.authenticateUser(db, searchField, identifier, password)
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
    });
});

// Creation of a new user

app.post('/user', [
    check('username').isString().withMessage('Invalid username'),
    check('email').isEmail().withMessage('Invalid email'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
                    .isString().withMessage('Invalid password').withMessage('Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character')
], (req, res) => {
    const errors = validationResult(req);

    // Check validation errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Create a new user object
    const user = new User(req.body.username, req.body.email, req.body.password);

    // Add the user to the database
    userQuery.addUser(db, user)
    .then(() => {
        console.log('User added successfully');
        res.status(201).send('User created');
    })
    .catch((err) => {  
        console.error(err);

        // Check for specific error messages and return appropriate response
        if (err.message === 'Username already taken' || err.message === 'Email already in use') {
            res.status(409).send(err.message);
        } else {
            res.status(500).send('Internal Server Error');
        }
    });
});

// Deletion of a user
app.delete('/user', (req, res) => {
    const user = new User(req.body.username, req.body.email, req.body.password);

    userQuery.delUser(db, user)
    .then(() => {
        console.log('User deleted successfully');
        res.status(200).end()
    })
    .catch((err) => {
        console.error(err);
        
        // Check for specific error messages and return them to the client
        if (err.message === 'User not found or parameters are incorrect') {
            res.status(404).send('User not found or incorrect parameters');
        } else {
            res.status(500).send('Internal Server Error');
        }
    });
});

/*-------------------------------------------*/
//                ORDER ROUTES
/*-------------------------------------------*/

app.get('/orders', (req, res) => {
    orderQuery.getOrders(db)
    .then((result) => {
        res.json(result)
        res.status(200).end()
    })
    .catch((err) => {
        console.error(err)
        res.status(500).end()
    })
});

app.get('/order', (req, res) => {
    const  id  = req.query.userId;

    console.log(id);
    orderQuery.getOrdersByUser(db, id)
    .then((result) => {
        if (result) {
            res.json(result)
            res.status(200).end()
        }
        else {
            res.status(404).send('No orders found for this user');
        }
    })
    .catch((err) => {
        console.error(err)
        res.status(500).end()
    })
});

app.post('/order', (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // If there are validation errors, send a 400 Bad Request response with the errors
        return res.status(400).json({ errors: errors.array() });
    }

    orderQuery.addOrder(db, req.body)
    .then(() => {
        console.log('Order added successfully');
        res.status(200).end()
    })
    .catch((err) => {
        console.error(err)
        res.status(500).end()
    })
});

/*-------------------------------------------*/
/*                BOWL ROUTES                */
/*-------------------------------------------*/

app.get('/bowls', (req, res) => {
    query.listBowls(db)
    .then((result) => {
        res.json(result)
        res.status(200).end()
    })
    .catch((err) => {
        console.error(err)
        res.status(500).end()
    })
});
  
  //get bowls by email or username
  app.get('/bowls/auth/user', [
    check('email').optional().isEmail().withMessage('Invalid email format'),
    check('username').optional().isString().withMessage('Invalid username'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
  ], (req, res) => {
    const { email, username, password } = req.query;
  
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    // Check if email or username is provided
    if (!email && !username) {
      return res.status(400).send('Email or username is required');
    }
  
    const searchField = email ? 'email' : 'username';
    const searchValue = email || username;
  
    query.getBowlsByUser(db, searchField, searchValue, password)
      .then((user) => {
        if (user) {
          res.status(200).json(user);  // Successfully authenticated
        } else {
          res.status(401).send('Invalid credentials');  // Authentication failed
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  });

app.get('/orders/discounts', (req, res) => {
    query.listDiscountedOrders(db)
    .then((result) => {
        res.json(result)
        res.status(200).end()
    })
    .catch((err) => {
        console.error(err)
        res.status(500).end()
    })
});

app.delete('/orders/:id', (req, res) => {
    const id = req.params.id;

    query.delOrder(db, id)
    .then(() => {
        console.log('Order deleted successfully');
        res.status(200).end()
    })
    .catch((err) => {
        console.error(err)
        if (err.message === 'Order not found') {
            res.status(404).send('Order not found');
        } else {
            res.status(500).send('Internal Server Error');
        }
        
    })
});

app.post("/bowls", [
    check('userId').isNumeric(),
    check('price').isNumeric(),
    check('orderId').isNumeric()
    ], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // If there are validation errors, send a 400 Bad Request response with the errors
        return res.status(400).json({ errors: errors.array() });
    }
    const bowl = new Bowl(req.body.size, req.body.base, req.body.proteins, req.body.ingredients, req.body.price);
    
    console.log(req.body.userId);
    console.log(req.body.orderId);
    console.log(bowl);
    query.addBowl(db, bowl, req.body.userId, req.body.orderId)
    .then(() => {
        console.log("Bowl added successfully");
        res.status(200).end();
    })
    .catch((err) => {
        console.error(err);
        res.status(500).end();
    });
});

app.delete('/bowls/:id', (req, res) => {
    const id = req.params.id;

    query.delBowl(db, id)
    .then(() => {
        console.log('Bowl deleted successfully');
        res.status(200).end()
    })
    .catch((err) => {
        console.error(err)
        if (err.message === 'Bowl not found') {
            res.status(404).send('Bowl not found');
        } else {
            res.status(500).send('Internal Server Error');
        }
        
    })
});


app.delete('/bowls/orders/:userId', (req, res) => {
    const userId = req.params.userId;
    query.delBowlByOrder(db, userId)
    .then(() => {
        console.log('Bowls deleted successfully');
        res.status(200).end()
    })
    .catch((err) => {
        console.error(err)
        if (err.message === 'Order not found') {
            res.status(404).send('Order not found');
        } else {
            res.status(500).send('Internal Server Error');
        }
        
    })
});

app.listen(port, () =>	console.log('Server	ready')) ;


