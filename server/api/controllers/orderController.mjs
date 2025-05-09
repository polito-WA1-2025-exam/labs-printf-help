import * as orderQueries from '../queries/orderQueries.mjs';
import * as genericQueries from '../queries/genericQueries.mjs';

// import { Order } from '../../type/order.mjs';
// import { Bowl } from '../../type/bowl.mjs';

export function getOrders (req, res) {
    const db = genericQueries.connectDB();

    orderQueries.retrieveOrdersList(db)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        console.error(err)
        res.status(500).end()
    })
    .finally(() => {
        genericQueries.closeDB(db);
    })
}

export function getOrdersByUser (req, res) {
    const db = genericQueries.connectDB();

    const  id  = req.params.userId;
    
    orderQueries.retrieveOrdersByUser(db, id)
    .then((result) => {
        if (result) {
            res.status(200).json(result)
        }
        else {
            res.status(404).send('No orders found for this user');
        }
    })
    .catch((err) => {
        console.error(err)
        res.status(500).end()
    })
    .finally(() => {
        genericQueries.closeDB(db);
    })
}

// export function postOrder (req, res) {
//     const db = genericQueries.connectDB();

//     console.log(req.body.userID);
//     const order = new Order(req.body.userID, req.body.total, req.body.appliedDiscount);
//     for (let i in req.body.bowls) {
//         order.addBowl(new Bowl(req.body.bowls[i].base, req.body.bowls[i].proteins, req.body.bowls[i].ingredients, req.body.bowls[i].price));
//     }
//     console.log(order.getUserID());

//     orderQueries.addOrder(db, order)
//     .then(() => {
//         res.status(201).send('Order created successfully')
//     })
//     .catch((err) => {
//         console.error(err)
//         res.status(500).end()
//     })
//     .finally(() => {
//         genericQueries.closeDB(db);
//     })
// }