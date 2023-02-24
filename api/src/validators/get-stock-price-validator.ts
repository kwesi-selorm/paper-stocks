import joi, { ValidationError } from 'joi'
import { Request, Response, NextFunction } from 'express'
import { GetStockPriceInput } from '../utils/types'

const schema = joi.object({
  symbol: joi.string().required()
})

export default function validateGetStockPriceInput(
  req: Request<GetStockPriceInput>,
  res: Response,
  next: NextFunction
) {
  const { error } = schema.validate(req.params)
  if (error) {
    if (error instanceof ValidationError) {
      const errorMessages = error.details.map((e) => e.message).join(', ')
      return res.status(400).json({ Error: errorMessages })
    }
    throw new Error('Request input validation failed')
  }
  next()
}
