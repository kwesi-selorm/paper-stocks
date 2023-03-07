import { ValidationError } from 'joi'
import { Request } from 'express'
import { getStockPriceInputSchema, userIdParamSchema } from '../joi-schema'

export default function validateGetStockPriceInput(req: Request) {
  const { error: paramsError } = userIdParamSchema.validate(req.params)
  const { error: bodyError } = getStockPriceInputSchema.validate(req.body)
  let errorMessages = ''
  if (
    paramsError instanceof ValidationError ||
    bodyError instanceof ValidationError
  ) {
    if (bodyError) {
      errorMessages += bodyError.details.map((e) => e.message).join(', ')
    }
    if (paramsError) {
      errorMessages += paramsError.details.map((e) => e.message).join(', ')
    }
    return errorMessages
  }
}
