import { Request, Response } from 'express'
import AssetModel from '../../models/asset'
import { validateGetAssetsInput } from '../../validators/users/get-assets-validator'

async function getAssets(req: Request, res: Response) {
  const errors = validateGetAssetsInput(req)
  if (errors) {
    return res.status(400).json({ message: errors })
  }
  const { userId } = req.params
  try {
    const assets = await AssetModel.find({ userId })
    return res.status(200).json(assets)
  } catch (e) {
    return res.status(400).json({ message: e })
  }
}

export default getAssets
