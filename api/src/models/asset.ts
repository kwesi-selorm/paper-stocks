import mongoose, { Schema } from 'mongoose'
import UserModel from './user'

export interface IAsset {
  id: Schema.Types.ObjectId
  position: number
  returnNumber: number
  returnPercent: number
  lastPrice: number
  users: Schema.Types.ObjectId[]
}

const assetSchema: Schema = new Schema<IAsset>({
  id: Schema.Types.ObjectId,
  position: { type: Number, required: true },
  returnNumber: { type: Number, required: true },
  returnPercent: { type: Number, required: true },
  lastPrice: { type: Number, required: true },
  users: [{ type: Schema.Types.ObjectId, ref: UserModel }]
})

const AssetModel = mongoose.model<IAsset>('Asset', assetSchema, 'assets')
export default AssetModel
