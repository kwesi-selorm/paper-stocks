import mongoose, { Schema } from 'mongoose'
import Asset from './asset'

export interface IUser {
  id: Schema.Types.ObjectId
  email: string
  username: string
  passwordHash: string
  passwordSalt: string
  passwordClue: string
  assets: Schema.Types.ObjectId[]
  buyingPower: number
}

const userSchema: Schema = new Schema<IUser>({
  id: Schema.Types.ObjectId,
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  passwordSalt: { type: String, required: true },
  passwordClue: String,
  assets: [{ type: Schema.Types.ObjectId, ref: Asset }],
  buyingPower: { type: Number, required: true }
})

const UserModel = mongoose.model<IUser>('User', userSchema, 'users')
export default UserModel
