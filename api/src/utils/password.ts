import * as crypto from 'node:crypto'

export function generatePasswordSalt(): string {
  return crypto.randomBytes(16).toString('hex')
}

export function encodePassword(password: string): string {
  const salt = generatePasswordSalt()
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex')
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
