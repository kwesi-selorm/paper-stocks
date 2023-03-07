import mongoose, { Schema } from 'mongoose'

export interface IUser {
  id: Schema.Types.ObjectId
  email: string
  username: string
  passwordHash: string
  passwordSalt: string
  passwordClue: string
  buyingPower: number
}

const userSchema: Schema = new Schema<IUser>({
  id: Schema.Types.ObjectId,
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  passwordSalt: { type: String, required: true },
  passwordClue: String,
  buyingPower: { type: Number, required: true }
})

const UserModel = mongoose.model<IUser>('UserModel', userSchema, 'users')
export default UserModel
