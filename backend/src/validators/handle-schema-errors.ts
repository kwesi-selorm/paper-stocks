import { ValidationError } from 'joi'

export function handleSchemaErrors(error: ValidationError | undefined) {
  if (error instanceof ValidationError) {
    return error.details.map((e) => e.message).join(', ')
  }
}
