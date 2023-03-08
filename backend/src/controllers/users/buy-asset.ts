import { Request, Response } from 'express'
import UserModel from '../../models/user'
import nasdaqStocks from '../../../assets/stocks-list'
import AssetModel from '../../models/asset'
import { findNewPositionAndAverage } from '../../helpers/asset-calculations'
import validateBuyAssetInput from '../../validators/users/buy-asset-validator'

async function buyAsset(req: Request, res: Response) {
  const errors = validateBuyAssetInput(req)
  if (errors) {
    return res.status(400).json({ message: errors })
  }
  const { name, symbol, position, lastPrice } = req.body
  const { userId } = req.params

  const userDocument = await UserModel.findById(userId).exec()
  if (userDocument == null) {
    return res.status(404).json({
      message: `User with id '${userId}' not found`
    })
  }
  const validSymbol = nasdaqStocks.find((stock) => stock.symbol === symbol)
  if (validSymbol === undefined) {
    return res.status(404).json({
      message: `${symbol} is not a valid Nasdaq-listed stock ticker`
    })
  }

  const alreadyOwnedAsset = await AssetModel.findOne({ userId, symbol }).exec()
  if (alreadyOwnedAsset !== null) {
    const { totalPosition, newAverage } = findNewPositionAndAverage(
      alreadyOwnedAsset.position,
      alreadyOwnedAsset.averagePrice,
      position,
      lastPrice
    )
    try {
      await AssetModel.updateOne(
        { userId, symbol },
        { position: totalPosition, averagePrice: newAverage }
      ).exec()
      const buyingPower = userDocument.buyingPower - position * lastPrice
      await UserModel.updateOne(
        { _id: userId },
        { buyingPower: buyingPower }
      ).exec()
      userDocument.buyingPower -= lastPrice * position
      return res.status(200).json({ name, symbol, totalPosition, newAverage })
    } catch (e) {
      return res
        .status(500)
        .json({ message: `The request to buy ${symbol} failed. ${e}` })
    }
  }

  try {
    const assetDocument = new AssetModel({
      name,
      symbol,
      position,
      averagePrice: lastPrice,
      userId
    })
    await assetDocument.save()
    res.status(200).json(assetDocument)
  } catch (e) {
    return res
      .status(500)
      .json({ message: `The request to buy ${symbol} failed. ${e}` })
  }
}

export default buyAsset
