import express from 'express'
import { check } from 'express-validator';

import * as orderController from '../controllers/orderController.mjs'

export const router = express.Router()

router.get('/list', orderController.getOrders)

router.get('/user', orderController.getOrdersByUser)

router.post('/submit', [
    check('total').isNumeric().withMessage('Invalid total amount')
], orderController.postOrder)