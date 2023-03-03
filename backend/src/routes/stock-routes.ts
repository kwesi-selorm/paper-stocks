import express from 'express'
import getStockPrice from '../controllers/stocks/get-stock-price'
import getNasdaqListedStocks from '../controllers/stocks/get-nasdaq-listed-stocks'
import validateGetStockPriceInput from '../middleware/validators/stocks/get-stock-price-input-validator'

const stocksRouter = express.Router()

stocksRouter.get(
  '/stock-price/:symbol',
  validateGetStockPriceInput,
  getStockPrice
)

stocksRouter.get('/nasdaq/all', getNasdaqListedStocks)

export default stocksRouter
