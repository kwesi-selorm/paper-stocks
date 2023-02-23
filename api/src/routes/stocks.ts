import express from 'express'
import { getStockPrice } from '../controllers/stocks'
const stocksRouter = express.Router()

stocksRouter.get('/stock-price/:ticker', getStockPrice)

export default stocksRouter
