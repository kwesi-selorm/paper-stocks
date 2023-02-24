import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  id: Schema.Types.ObjectId,
  name: String,
  email: String,
  passwordHash: String,
  passwordSalt: String,
  assets: [{ type: Schema.Types.ObjectId, ref: 'Stock' }],
  remainingCash: Number
})

export default model('User', userSchema, 'users')
