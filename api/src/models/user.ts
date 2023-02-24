import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  id: Schema.Types.ObjectId,
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  passwordSalt: { type: String, required: true },
  passwordClue: String,
  assets: [{ type: Schema.Types.ObjectId, ref: 'Asset' }],
  buyingPower: { type: Number, required: true }
})

export default model('User', userSchema, 'users')
