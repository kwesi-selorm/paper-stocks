import { Request } from 'express'
import { signUpInputSchema } from '../joi-schema'
import { ValidationError } from 'joi'

export default function validateSignUpInput(req: Request) {
  const { error } = signUpInputSchema.validate(req.body, { abortEarly: false })
  if (error instanceof ValidationError) {
    return error.details.map((e) => e.message).join(', ')
  }
}
