import { Request, Response } from 'express'
import axios, { AxiosError } from 'axios'
import { StockPrice } from '../utils/types'
import { createGetStockPriceRequestConfig } from '../configs/stocks-api'
import nasdaqStocks from '../../assets/nasdaq-listed-stocks'

const api = axios.create()

export async function getStockPrice(
  req: Request,
  res: Response
): Promise<Response<StockPrice>> {
  const { symbol } = req.params
  if (symbol === null || symbol === undefined) {
    return res.status(400).json({
      message: 'Missing or invalid symbol argument'
    })
  }

  try {
    const response = await api.request(createGetStockPriceRequestConfig(symbol))
    const data = await response.data
    return res.status(200).json(data)
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message)
    }
    throw new Error('The request to fetch stock prices failed')
  }
}

export async function getNasdaqListedStocks(req: Request, res: Response) {
  return res.status(200).json(nasdaqStocks)
}

//getStockList(), getUser(username, password), getUserStocks(id)
