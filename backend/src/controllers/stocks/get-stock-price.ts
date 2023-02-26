import { Request, Response } from 'express'
import axios, { AxiosError } from 'axios'
import { StockPrice } from '../../utils/types'
import { createGetStockPriceRequestConfig } from '../../configs/stocks-api'

const api = axios.create()

async function getStockPrice(
  req: Request,
  res: Response
): Promise<Response<StockPrice>> {
  const { symbol } = req.params

  try {
    const response = await api.request(createGetStockPriceRequestConfig(symbol))
    const data = await response.data
    return res.status(200).json(data)
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message)
    }
    throw new Error(
      'The request to fetch the last real-time stock price failed'
    )
  }
}

export default getStockPrice

//getStockList(), getUser(username, password), getUserStocks(id)
