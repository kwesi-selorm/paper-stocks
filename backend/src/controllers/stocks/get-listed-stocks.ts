import { Request, Response } from 'express'
import listedStocks from '../../../assets/stocks-list'

async function getListedStocks(req: Request, res: Response) {
  return res.status(200).json({ data: listedStocks })
}

export default getListedStocks
