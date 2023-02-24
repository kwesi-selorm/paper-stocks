import { Request, Response } from 'express'
async function signIn(req: Request, res: Response) {
  const { username, password } = req.body
  res.status(200).json({ username, password })
}

export default signIn
