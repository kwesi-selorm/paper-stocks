import { Request, Response } from 'express'
import axios, { AxiosError } from 'axios'
import { StockPrice } from '../utils/types'
import { createGetStockPriceRequestConfig } from '../configs/stocks-api'

const api = axios.create()

export async function getStockPrice(
  req: Request,
  res: Response
): Promise<Response<StockPrice>> {
  const { ticker } = req.params
  if (ticker === null || ticker === undefined) {
    return res.status(400).json({
      message: 'Missing or invalid ticker argument'
    })
  }

  try {
    const response = await api.request(createGetStockPriceRequestConfig(ticker))
    const data = await response.data
    return res.status(200).json(data)
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message)
    }
    throw new Error('The request to fetch stock prices failed')
  }
}
