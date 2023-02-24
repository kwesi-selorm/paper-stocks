import { Request, Response } from 'express'
import { encodePassword } from '../../utils/password'
import { AssetRecord } from '../../utils/types'
import mongoose from 'mongoose'
import User from '../../models/user'

async function signUp(req: Request, res: Response) {
  const { email, username, password, passwordClue } = req.body
  const { passwordSalt, passwordHash } = encodePassword(password)
  const existingEmailUser = await User.findOne({ email })
  const existingUsernameUser = await User.findOne({ username })
  if (existingEmailUser != null) {
    res
      .status(400)
      .json({ Error: `A user with the email ${email} already exists` })
  }
  if (existingUsernameUser != null) {
    res
      .status(400)
      .json({ Error: `A user with the username ${username} already exists` })
  }

  const assets: AssetRecord[] = []
  const buyingPower = 100000
  const saveUserInput = {
    ...req.body,
    passwordSalt,
    passwordClue,
    passwordHash,
    assets,
    buyingPower
  }
  try {
    const document = new User(saveUserInput)
    await document.save()
    return res.status(200).json(document)
  } catch (e: unknown) {
    if (e instanceof mongoose.Error) {
      res.status(400).json({ Error: e.message })
    }
    return res.status(400).json({ Error: e })
  }
}

export default signUp
