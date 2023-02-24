import { Schema, model } from 'mongoose'
import { AssetRecord } from '../utils/types'

const assetSchema = new Schema<AssetRecord>({
  id: Schema.Types.ObjectId,
  position: { type: Number, required: true },
  returnNumber: { type: Number, required: true },
  returnPercent: { type: Number, required: true },
  lastPrice: { type: Number, required: true },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

export default model('Stock', assetSchema, 'assets')
