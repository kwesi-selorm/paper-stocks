import { Request, Response } from 'express'
import { encodePassword } from '../../helpers/password-helper'
import mongoose from 'mongoose'
import UserModel from '../../models/user'

async function signUp(req: Request, res: Response) {
  const { email, username, password, passwordClue } = req.body
  const { passwordSalt, passwordHash } = encodePassword(password)
  const existingEmailUser = await UserModel.findOne({ email })
  const existingUsernameUser = await UserModel.findOne({ username })
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
    // assets,
    buyingPower
  }
  try {
    const document = new UserModel(saveUserInput)
    await document.save()
    return res.status(200).json(document)
  } catch (e: unknown) {
    if (e instanceof mongoose.Error) {
      return res.status(400).json({ Error: e.message })
    }
    return res.status(400).json({ Error: e })
  }
}

export default signUp
