import * as crypto from 'node:crypto'
import { EncodePasswordOutput } from '../utils/types'

export function generatePasswordSalt(): string {
  return crypto.randomBytes(16).toString('hex')
}

export function encodePassword(password: string): EncodePasswordOutput {
  const passwordSalt = generatePasswordSalt()
  const passwordHash = crypto
    .pbkdf2Sync(password, passwordSalt, 10000, 64, 'sha256')
    .toString('hex')
  return { passwordSalt, passwordHash }
}

export function decodePasswordHash(
  password: string,
  salt: string,
  dbPasswordHash: string
): boolean {
  const passwordHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha256')
    .toString('hex')
  return crypto.timingSafeEqual(
    Buffer.from(passwordHash),
    Buffer.from(dbPasswordHash)
  )
}
