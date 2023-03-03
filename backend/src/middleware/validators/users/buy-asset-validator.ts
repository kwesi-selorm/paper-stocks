import { ValidationError } from 'joi'
import { Request, Response, NextFunction } from 'express'
import { buyAssetInputSchema, userIdParamSchema } from '../joi-schema'

export default function validateBuyAssetInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error: bodyError } = buyAssetInputSchema.validate(req.body, {
    abortEarly: false
  })
  const { error: paramsError } = userIdParamSchema.validate(req.params)
  let errorMessages = ''
  if (
    bodyError instanceof ValidationError ||
    paramsError instanceof ValidationError
  ) {
    if (bodyError) {
      errorMessages += bodyError.details.map((e) => e.message).join(', ')
    }
    if (paramsError) {
      errorMessages += paramsError.details.map((e) => e.message).join(', ')
    }
    return res.status(400).json({ message: errorMessages })
  }
  return next()
}
