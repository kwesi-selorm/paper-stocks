import { Request, Response } from 'express'
import nasdaqStocks from '../../../assets/nasdaq-listed-stocks'

async function getNasdaqListedStocks(req: Request, res: Response) {
  return res.status(200).json(nasdaqStocks)
}

export default getNasdaqListedStocks
