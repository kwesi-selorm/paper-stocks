import { Request, Response } from 'express'
import UserModel from '../../models/user'
import validateSignInInput from '../../validators/users/signin-validator'

async function signIn(req: Request, res: Response) {
  const errors = validateSignInInput(req)
  if (errors) {
    return res.status(400).json({ message: errors })
  }
  const { username } = req.body
  const token = req.body.token
  const userDocument = await UserModel.findOne({ username })

  if (userDocument == null) {
    return res.status(404).json({ message: 'User not found' })
  }

  return res.status(200).json({
    id: userDocument._id,
    username: userDocument.username,
    token,
    buyingPower: userDocument.buyingPower
  })
}

export default signIn
