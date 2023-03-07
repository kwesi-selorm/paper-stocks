import { Request, Response } from 'express'
import axios, { AxiosError } from 'axios'
import { createGetStockPriceRequestConfig } from '../../configs/stocks-api'
import validateGetStockPriceInput from '../../validators/stocks/get-stock-price-input-validator'

const api = axios.create()

async function getTickerStockPrice(ticker: string) {
  try {
    const response = await api.request(createGetStockPriceRequestConfig(ticker))
    const data = await response.data
    const price = data.price
    return { ticker, price }
  } catch (error: any) {
    throw new error(error.message)
  }
}

async function getTickerArrayStockPrices(tickers: string[]) {
  return await Promise.all(
    tickers.map(async (t) => await getTickerStockPrice(t))
  )
}

async function getStockPrice(req: Request, res: Response) {
  const errorMessages = validateGetStockPriceInput(req)
  if (errorMessages) {
    return res.status(400).json({ error: errorMessages })
  }
  const { tickers } = req.body

  try {
    const data = await getTickerArrayStockPrices(tickers)
    return res.status(200).json(data)
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error.response?.status as number
      return res.status(status).json({ error: error?.response?.data.message })
    }
    return res.status(500).json({
      message: 'The request to fetch the last real-time stock price failed'
    })
  }
}

export default getStockPrice

//getStockList(), getUser(username, password), getUserStocks(id)
