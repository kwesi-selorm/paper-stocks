import express from 'express'
import { getNasdaqListedStocks, getStockPrice } from '../controllers/stocks'
import validateGetStockPriceInput from '../validators/get-stock-price-validator'
const stocksRouter = express.Router()

stocksRouter.get(
  '/stock-price/:symbol',
  validateGetStockPriceInput,
  getStockPrice
)
stocksRouter.get('/nasdaq/all', getNasdaqListedStocks)

export default stocksRouter
