import { validationResult } from 'express-validator';

import * as orderQueries from '../queries/orderQueries.mjs';
import * as genericQueries from '../queries/genericQueries.mjs';

import { Order } from '../../type/order.mjs';

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

    const  id  = req.query.userId;
    
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