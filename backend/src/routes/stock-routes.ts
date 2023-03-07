import express from 'express'
import getStockPrice from '../controllers/stocks/get-stock-price'
import getListedStocks from '../controllers/stocks/get-listed-stocks'
import validateGetStockPriceInput from '../validators/stocks/get-stock-price-input-validator'

const stocksRouter = express.Router()

stocksRouter.get(
  '/stock-price/:symbol',
  validateGetStockPriceInput,
  getStockPrice
)

stocksRouter.get('/nasdaq/all', getListedStocks)

export default stocksRouter
