import express from 'express'
import getStockPrice from '../controllers/stocks/get-stock-price'
import getListedStocks from '../controllers/stocks/get-listed-stocks'

const stocksRouter = express.Router()

stocksRouter.get('/stock-price/:userId', getStockPrice)

stocksRouter.get('/nasdaq/all', getListedStocks)

export default stocksRouter
