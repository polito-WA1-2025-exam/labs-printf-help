import express from 'express'
import { check } from 'express-validator';

import * as userController from '../controllers/userController.mjs'

export const router = express.Router()

router.get('/list', userController.getUsers)

router.get('/authenticate', [
        check('identifier').isString().withMessage('Invalid email or username'),
        check('password').isString().withMessage('Invalid password')
], userController.authenticateUser)

router.post('/register', [
    check('username').isString().withMessage('Invalid username'),
    check('email').isEmail().withMessage('Invalid email'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
                    .isString().withMessage('Invalid password').withMessage('Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character')
], userController.postUser)

router.delete('/delete', userController.deleteUser)