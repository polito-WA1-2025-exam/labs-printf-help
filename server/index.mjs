import express from "express"
import cors from "cors"
import morgan from 'morgan';

import * as userRoutes from './api/routes/userRoutes.mjs';
import * as orderRoutes from './api/routes/orderRoutes.mjs';

const app = express()
const port = 3000

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json())
app.use(morgan('dev'))
app.use('/api/user', userRoutes.router)
app.use('/api/order', orderRoutes.router)

app.listen(port, () => {console.log(`Api server started at http://localhost:${port}`)})