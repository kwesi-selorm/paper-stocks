import { Request, Response } from 'express'
import validateSellAssetInput from '../../validators/users/sell-asset-validator'
import UserModel from '../../models/user'
import verifySymbol from '../../helpers/verify-symbol'
import AssetModel from '../../models/asset'
import { findPositionAndAverageOnSell } from '../../helpers/asset-calculations'

export default async function sellAsset(req: Request, res: Response) {
  const errorMessages = validateSellAssetInput(req)
  if (errorMessages !== undefined) {
    return res.status(400).json({
      message: errorMessages
    })
  }
  const { symbol, positionsSold, unitPrice } = req.body
  const { userId } = req.params

  const userDoc = await UserModel.findById(userId).exec()
  if (userDoc == null) {
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
  if (alreadyOwnedAsset == null) {
    return res.status(403).json({
      message: `You do now own the asset with ${symbol} to be able to sell it`
    })
  }

  const { remainingPosition, gainOrLoss } = findPositionAndAverageOnSell(
    alreadyOwnedAsset.position,
    alreadyOwnedAsset.averagePrice,
    positionsSold,
    unitPrice
  )
  const newBuyingPower = userDoc.buyingPower + gainOrLoss

  try {
    const updatedDoc = await AssetModel.findByIdAndUpdate(
      alreadyOwnedAsset._id,
      { position: remainingPosition },
      { new: true }
    ).exec()

    await UserModel.findByIdAndUpdate(userId, {
      buyingPower: newBuyingPower
    }).exec()

    if (updatedDoc == null) {
      return res.status(500).json({
        message: `Error updating asset '${alreadyOwnedAsset.symbol}', please try again later`
      })
    }

    return res.status(200).json({
      symbol,
      position: updatedDoc.position
    })
  } catch (e) {
    return res.status(500).json({
      message: `Error updating asset '${alreadyOwnedAsset.symbol}, please try again later`
    })
  }
}
