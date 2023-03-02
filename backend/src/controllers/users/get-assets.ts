import { Request, Response } from 'express'
import { validateGetAssetsInput } from '../../validators/users/get-assets-validator'
import AssetModel from '../../models/asset'

async function getAssets(req: Request, res: Response) {
  const { userId } = req.params
  try {
    const assets = await AssetModel.find({ userId })
    return res.status(200).json(assets)
  } catch (e) {
    return res.status(400).json({ message: e })
  }
}

export default getAssets
