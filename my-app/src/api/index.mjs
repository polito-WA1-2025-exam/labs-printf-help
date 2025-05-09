import express from "express"
import cors from "cors"
import morgan from 'morgan';

import * as userRoutes from './routes/userRoutes.mjs';
import * as orderRoutes from './routes/orderRoutes.mjs';

const app = express()
const port = 3000
app.use(cors())

app.use(express.json())
app.use(morgan('dev'))
app.use('/user', userRoutes.router)
app.use('/order', orderRoutes.router)