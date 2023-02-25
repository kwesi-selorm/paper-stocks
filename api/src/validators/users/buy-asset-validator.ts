import joi, { ValidationError } from 'joi'
import { Request } from 'express'

const bodySchema = joi.object({
  name: joi.string().required(),
  symbol: joi.string().required(),
  position: joi.number().required(),
  lastPrice: joi.number().required()
})

const paramsSchema = joi.object({
  userId: joi.string().required()
})

export default function validateSaveAssetInput(req: Request) {
  const { error: bodyError } = bodySchema.validate(req.body, {
    abortEarly: false
  })
  const { error: paramsError } = paramsSchema.validate(req.params)
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
    return errorMessages
  } else {
    return
  }
}
