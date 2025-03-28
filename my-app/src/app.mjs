import express from 'express'
import morgan from 'morgan';

import * as userRoutes from './api/routes/userRoutes.mjs';
import * as orderRoutes from './api/routes/orderRoutes.mjs';

import { Order } from './type/order.mjs'
import { Bowl } from './type/bowl.mjs'

const app = express() ;
const port = 3000;

app.use(express.json())
app.use(morgan('dev'))
app.use('/user', userRoutes.router)
app.use('/order', orderRoutes.router)

const order = new Order({userID: 1});
const bowl1 = new Bowl({size: 'S', base: 'White rice', proteins: ['Chicken'], ingredients: ['Lettuce', 'Tomato'], price: 10});
const bowl2 = new Bowl({size: 'M', base: 'Black rice', proteins: ['Salmon', 'Shrimp'], ingredients: ['Mango', 'Avocado', 'Mais'], price: 12});

order.addBowl(bowl1);
order.addBowl(bowl2);

console.log(order.toJSON());

/*-------------------------------------------*/
//                ORDER ROUTES
/*-------------------------------------------*/

// app.post('/order', (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         // If there are validation errors, send a 400 Bad Request response with the errors
//         return res.status(400).json({ errors: errors.array() });
//     }

//     orderQuery.addOrder(db, req.body)
//     .then(() => {
//         console.log('Order added successfully');
//         res.status(200).end()
//     })
//     .catch((err) => {
//         console.error(err)
//         res.status(500).end()
//     })
// });

// /*-------------------------------------------*/
// /*                BOWL ROUTES                */
// /*-------------------------------------------*/

// app.get('/bowls', (req, res) => {
//     query.listBowls(db)
//     .then((result) => {
//         res.json(result)
//         res.status(200).end()
//     })
//     .catch((err) => {
//         console.error(err)
//         res.status(500).end()
//     })
// });
  
//   //get bowls by email or username
//   app.get('/bowls/auth/user', [
//     check('email').optional().isEmail().withMessage('Invalid email format'),
//     check('username').optional().isString().withMessage('Invalid username'),
//     check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
//   ], (req, res) => {
//     const { email, username, password } = req.query;
  
//     // Check validation errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
  
//     // Check if email or username is provided
//     if (!email && !username) {
//       return res.status(400).send('Email or username is required');
//     }
  
//     const searchField = email ? 'email' : 'username';
//     const searchValue = email || username;
  
//     query.getBowlsByUser(db, searchField, searchValue, password)
//       .then((user) => {
//         if (user) {
//           res.status(200).json(user);  // Successfully authenticated
//         } else {
//           res.status(401).send('Invalid credentials');  // Authentication failed
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         res.status(500).send('Internal Server Error');
//       });
//   });

// app.get('/orders/discounts', (req, res) => {
//     query.listDiscountedOrders(db)
//     .then((result) => {
//         res.json(result)
//         res.status(200).end()
//     })
//     .catch((err) => {
//         console.error(err)
//         res.status(500).end()
//     })
// });

// app.delete('/orders/:id', (req, res) => {
//     const id = req.params.id;

//     query.delOrder(db, id)
//     .then(() => {
//         console.log('Order deleted successfully');
//         res.status(200).end()
//     })
//     .catch((err) => {
//         console.error(err)
//         if (err.message === 'Order not found') {
//             res.status(404).send('Order not found');
//         } else {
//             res.status(500).send('Internal Server Error');
//         }
        
//     })
// });

// app.post("/bowls", [
//     check('userId').isNumeric(),
//     check('price').isNumeric(),
//     check('orderId').isNumeric()
//     ], (req, res) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//         // If there are validation errors, send a 400 Bad Request response with the errors
//         return res.status(400).json({ errors: errors.array() });
//     }
//     const bowl = new Bowl(req.body.size, req.body.base, req.body.proteins, req.body.ingredients, req.body.price);
    
//     console.log(req.body.userId);
//     console.log(req.body.orderId);
//     console.log(bowl);
//     query.addBowl(db, bowl, req.body.userId, req.body.orderId)
//     .then(() => {
//         console.log("Bowl added successfully");
//         res.status(200).end();
//     })
//     .catch((err) => {
//         console.error(err);
//         res.status(500).end();
//     });
// });

// app.delete('/bowls/:id', (req, res) => {
//     const id = req.params.id;

//     query.delBowl(db, id)
//     .then(() => {
//         console.log('Bowl deleted successfully');
//         res.status(200).end()
//     })
//     .catch((err) => {
//         console.error(err)
//         if (err.message === 'Bowl not found') {
//             res.status(404).send('Bowl not found');
//         } else {
//             res.status(500).send('Internal Server Error');
//         }
        
//     })
// });


// app.delete('/bowls/orders/:userId', (req, res) => {
//     const userId = req.params.userId;
//     query.delBowlByOrder(db, userId)
//     .then(() => {
//         console.log('Bowls deleted successfully');
//         res.status(200).end()
//     })
//     .catch((err) => {
//         console.error(err)
//         if (err.message === 'Order not found') {
//             res.status(404).send('Order not found');
//         } else {
//             res.status(500).send('Internal Server Error');
//         }
        
//     })
// });

app.listen(port, () =>	console.log('Server	ready')) ;


