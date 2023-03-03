import { Request, Response } from 'express'
import { encodePassword } from '../../helpers/password-helper'
import mongoose from 'mongoose'
import UserModel from '../../models/user'

async function signUp(req: Request, res: Response) {
  console.log(req.body.token)
  const token = req.body.token
  const { email, username, password, passwordClue } = req.body
  const { passwordSalt, passwordHash } = encodePassword(password)
  const [existingEmailUser, existingUsernameUser] = await Promise.all([
    UserModel.findOne({ email }),
    UserModel.findOne({ username })
  ])
  if (existingEmailUser != null) {
    return res
      .status(400)
      .json({ Error: `A user with the email ${email} already exists` })
  }
  if (existingUsernameUser != null) {
    return res
      .status(400)
      .json({ Error: `A user with the username ${username} already exists` })
  }

  const buyingPower = 100000
  const saveUserInput = {
    ...req.body,
    passwordSalt,
    passwordClue,
    passwordHash,
    buyingPower
  }
  try {
    const document = new UserModel(saveUserInput)
    await document.save()
    return res
      .status(200)
      .json({ id: document._id, username: document.username, token })
  } catch (e: unknown) {
    if (e instanceof mongoose.Error) {
      return res.status(400).json({ message: e.message })
    }
    return res.status(400).json({ message: e })
  }
}

export default signUp
