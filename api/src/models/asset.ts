import { Schema, model } from 'mongoose'

const assetSchema = new Schema({
  id: Schema.Types.ObjectId,
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

export default model('Stock', assetSchema, 'assets')
