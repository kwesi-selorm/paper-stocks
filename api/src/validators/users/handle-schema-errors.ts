import { ValidationError } from 'joi'
import { Response } from 'express'

export function handleSchemaErrors(
  error: ValidationError | undefined,
  res: Response
) {
  if (error) {
    if (error instanceof ValidationError) {
      const errorMessages = error.details.map((e) => e.message).join(', ')
      return res.status(400).json({ Error: errorMessages })
    }
    throw new Error('Request input validation failed')
  }
}
