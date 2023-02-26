import { Request, Response } from 'express'
import UserModel from '../../models/user'
import validateUserSignInInput from '../../validators/users/signin-validator'
async function signIn(req: Request, res: Response) {
  const errorMessages = validateUserSignInInput(req)
  if (errorMessages !== undefined) {
    return res.status(400).json({
      message: errorMessages
    })
  }
  const { username } = req.body
  const userDocument = await UserModel.findOne({ username })

  if (userDocument == null) {
    return res.status(404).json({ Error: 'User not found' })
  }

  res
    .status(200)
    .json({ id: userDocument._id, username: userDocument.username })
}

export default signIn
