import express from 'express'
import { getNasdaqListedStocks, getStockPrice } from '../controllers/stocks'
const stocksRouter = express.Router()

stocksRouter.get('/stock-price/:ticker', getStockPrice)
stocksRouter.get('/nasdaq/all', getNasdaqListedStocks)

export default stocksRouter
