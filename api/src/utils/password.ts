import * as crypto from 'node:crypto'

export function generatePasswordSalt(): string {
  return crypto.randomBytes(16).toString('hex')
}

export function encodePassword(password: string): string {
  const salt = generatePasswordSalt()
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex')
}

export function decodePasswordHash(password: string, salt: string): boolean {
  const passwordHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha256')
    .toString('hex')
  return crypto.timingSafeEqual(
    Buffer.from(passwordHash),
    Buffer.from(
      'bab365130ac91ca24aaa58a729ca2cfd9a67b761187d92e557610c95a7cd4c5747e976eb1f2eddf6ee439e9e186122c467b6449bd965ca7cd97dc83884651d4b'
    )
  )
}
