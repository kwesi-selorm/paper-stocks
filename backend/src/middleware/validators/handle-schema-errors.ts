import { ValidationError } from 'joi'
import { Response } from 'express'

export function handleSchemaErrors(
  error: ValidationError | undefined,
  res: Response
) {
  if (error instanceof ValidationError) {
    const errorMessages = error.details.map((e) => e.message).join(', ')
    return res.status(400).json({ message: errorMessages })
  }
}
