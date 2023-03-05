import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import User from '../models/user'
import { verifyPassword } from '../helpers/password-helper'
dotenv.config()

async function generateToken(req: Request, res: Response, next: NextFunction) {
  const user = req.body

  if (req.path === '/signin') {
    const userRecord = await User.findOne({ username: user.username })
    if (userRecord == null) {
      return res.status(401).json({
        message: 'Registered user not found'
      })
    }
    const isAuthorized = verifyPassword(
      user.password,
      userRecord.passwordSalt,
      userRecord.passwordHash
    )
    if (!isAuthorized) {
      return res.status(401).json({
        message: 'Unauthorized: Invalid username or password'
      })
    }
  }

  const secret = process.env.JWT_SECRET
  if (secret === undefined) {
    throw new Error('JWT_SECRET is required for authentication')
  }

  req.body.token = jwt.sign(
    { data: { username: user.username, password: user.password } },
    secret,
    { expiresIn: '24h' }
  )

  return next()
}

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization
  const { userId } = req.params
  const secret = process.env.JWT_SECRET
  if (secret === undefined) {
    throw new Error('JWT_SECRET is not defined')
  }
  if (authHeader === undefined) {
    return res.status(401).json({
      message: 'Unauthorized: No authentication token provided'
    })
  }
  const token = authHeader.split(' ')[1]
  const userRecord = await User.findOne({ _id: userId })
  if (!userRecord) {
    return res.status(401).json({
      message: 'Unauthorized: User not found'
    })
  }
  let user: JwtPayload | string
  try {
    user = jwt.verify(token, secret, { maxAge: '24h' }) as JwtPayload
  } catch (err) {
    return res.status(401).json({
      message: 'Unauthorized: Invalid or expired token. Please sign in again'
    })
  }

  const isAuthorized = verifyPassword(
    user.data.password,
    userRecord.passwordSalt,
    userRecord.passwordHash
  )
  if (!isAuthorized) {
    return res.status(401).json({
      message: 'Unauthorized: Invalid username or password'
    })
  }
  return next()
}

export { generateToken }
