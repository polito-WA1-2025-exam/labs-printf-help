import express from 'express'
import { validationResult, check } from 'express-validator';
import morgan from 'morgan';
import sqlite from 'sqlite3'
import bcrypt from 'bcryptjs';

import * as query from './query.mjs';
import { User } from './user.mjs';
import { Order } from './order.mjs';
import { Bowl } from './bowl.mjs';

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

// At some point we should change to loading this key from an env. variable
const SECRET_KEY = "secret-key";

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
        check('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long')
    ], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // If there are validation errors, send a 400 Bad Request response with the errors
        return res.status(400).json({ errors: errors.array() });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User(req.body.username, req.body.email, hashedPassword);   
    
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

app.post('/user/check', [
    check('username').isString(),
    check('email').isEmail(),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // If there are validation errors, send a 400 Bad Request response with the errors
        return res.status(400).json({ errors: errors.array() });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User(req.body.username, req.body.email, hashedPassword);

    query.addUserWithCheck(db, user)
    .then(() => {
        console.log('User added successfully');
        res.status(201).send('User created');
    })
    .catch((err) => {
        console.error(err);
        
        // Check for specific error messages and return appropriate response
        if (err.message === 'Username already taken') {
            res.status(409).send('Username already taken');
        } else if (err.message === 'Email already in use') {
            res.status(409).send('Email already in use');
        } else {
            res.status(500).send('Internal Server Error');
        }
    });
});







app.delete('/user', [
    check('username').isString(),
    check('email').isEmail(),
    check('password').isLength({min: 8})
    ], (req, res) => {
    const user = new User(req.body.username, req.body.email, req.body.password);

    query.delUser(db, user)
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

// app.get('/bowls', (req, res) => {
//     query.listBowls(db)
//     .then((result) => {
//         result.forEach(item => console.log(JSON.stringify(item)));
//         res.status(200).end()
//     })
//     .catch((err) => {
//         console.error(err)
//         res.status(501).end()
//     })
// });
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

app.get('/user/authenticate', [
    check('email').optional().isEmail().withMessage('Invalid email format'),
    check('username').optional().isString().withMessage('Invalid username'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
  ], async (req, res) => {
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

    try {
        // Try fetching user details from the database
        const user = await query.authenticateUser(db, searchField, searchValue);

        // Compare provided password with the hashed password in db
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(401).send('Invalid credentials');
        }

        // Successfully authenticated
        res.status(200).json(user);
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
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


  app.get('/orders', (req, res) => {
    query.listOrders(db)
    .then((result) => {
        res.json(result)
        res.status(200).end()
    })
    .catch((err) => {
        console.error(err)
        res.status(500).end()
    })
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

app.post('/orders', [
    check('userID').isNumeric(),
    check('total').isNumeric()
    ], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // If there are validation errors, send a 400 Bad Request response with the errors
        return res.status(400).json({ errors: errors.array() });
    }
    const order = new Order({userID:req.body.userID, total:req.body.total, appliedDiscount:req.body.appliedDiscount});
    
    query.addOrder(db, order)
    .then(() => {
        console.log('Order added successfully');
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


