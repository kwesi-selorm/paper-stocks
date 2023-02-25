import { Request, Response } from 'express'
import UserModel from '../../models/user'
async function signIn(req: Request, res: Response) {
  const { username } = req.body
  const userDocument = await UserModel.findOne({ username })

  if (userDocument == null) {
    return res.status(404).json({ Error: 'User not found' })
  }

  res.status(200).json({ assets: userDocument._id })
}

export default signIn
