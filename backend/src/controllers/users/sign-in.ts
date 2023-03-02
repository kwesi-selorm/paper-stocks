import { Request, Response } from 'express'
import UserModel from '../../models/user'

async function signIn(req: Request, res: Response) {
  const { username } = req.body
  const token = req.body.token
  const userDocument = await UserModel.findOne({ username })

  if (userDocument == null) {
    return res.status(404).json({ message: 'User not found' })
  }

  res
    .status(200)
    .json({ id: userDocument._id, username: userDocument.username, token })
}

export default signIn
