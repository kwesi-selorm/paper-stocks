import { Request, Response } from 'express'
import UserModel from '../../models/user'
import AssetModel from '../../models/asset'
import { findPositionAndAverageOnBuy } from '../../helpers/asset-calculations'
import validateBuyAssetInput from '../../validators/users/buy-asset-validator'
import verifySymbol from '../../helpers/verify-symbol'

async function buyAsset(req: Request, res: Response) {
  const errors = validateBuyAssetInput(req)
  if (errors) {
    return res.status(400).json({ message: errors })
  }
  const { name, symbol, position, amountInvested } = req.body
  const { userId } = req.params

  const userDocument = await UserModel.findById(userId).exec()
  if (userDocument == null) {
    return res.status(404).json({
      message: `User with id '${userId}' not found`
    })
  }
  const validSymbol = verifySymbol(symbol)
  if (!validSymbol) {
    return res.status(404).json({
      message: `${symbol} is not a valid Nasdaq-listed stock ticker`
    })
  }

  const alreadyOwnedAsset = await AssetModel.findOne({ userId, symbol }).exec()
  if (alreadyOwnedAsset !== null) {
    const { totalPosition, averagePrice } = findPositionAndAverageOnBuy(
      alreadyOwnedAsset.position,
      alreadyOwnedAsset.amountInvested,
      position,
      amountInvested
    )
    const buyingPower = userDocument.buyingPower - amountInvested
    try {
      await AssetModel.updateOne(
        { userId, symbol },
        { position: totalPosition, averagePrice }
      ).exec()
      await UserModel.updateOne({ _id: userId }, { buyingPower }).exec()
      return res.status(200).json({ symbol, totalPosition })
    } catch (e) {
      return res
        .status(500)
        .json({ message: `The request to buy ${symbol} failed. ${e}` })
    }
  }

  try {
    const assetDocument = new AssetModel({
      symbol,
      name,
      position,
      amountInvested,
      averagePrice: amountInvested / position,
      userId
    })
    await assetDocument.save()
    res.status(200).json({ symbol, position })
  } catch (e) {
    return res
      .status(500)
      .json({ message: `The request to buy ${symbol} failed. ${e}` })
  }
}

export default buyAsset
