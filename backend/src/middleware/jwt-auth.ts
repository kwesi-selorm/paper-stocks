import { SignInInput, TokenUser } from '../utils/types'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import User from '../models/user'
import { verifyPassword } from '../helpers/password-helper'
dotenv.config()

function generateToken(req: Request, res: Response, next: NextFunction) {
  const user = req.body
  const secret = process.env.JWT_SECRET
  if (secret === undefined) {
    throw new Error('JWT_SECRET is required for authentication')
  }
  req.body.token = jwt.sign(
    { username: user.username, password: user.password },
    secret,
    {
      expiresIn: '2m'
    }
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
  console.log(userId)
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
  let user: TokenUser | undefined
  try {
    user = (await jwt.verify(token, secret)) as TokenUser | undefined
  } catch (err) {
    return res.status(401).json({
      message: 'Unauthorized: Invalid token'
    })
  }
  if (user === undefined) {
    return res.status(401).json({
      message: 'Unauthorized: Invalid token'
    })
  }

  const isAuthorized = verifyPassword(
    user.password,
    userRecord.passwordSalt,
    userRecord.passwordHash
  )
  if (!isAuthorized) {
    return res.status(401).json({
      message: 'Unauthorized: Invalid or expired token. Please sign in again'
    })
  }
  return next()
}

export { generateToken }
