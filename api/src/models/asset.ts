import mongoose, { Schema } from 'mongoose'

export interface IAsset {
  symbol: string
  name: string
  position: number
  averagePrice: number
  userId: string
}

const assetSchema: Schema = new Schema<IAsset>({
  symbol: { type: String, required: true },
  name: { type: String, required: true },
  position: { type: Number, required: true },
  averagePrice: { type: Number, required: true },
  userId: { type: String, required: true }
})

const AssetModel = mongoose.model<IAsset>('AssetModel', assetSchema, 'assets')
export default AssetModel
