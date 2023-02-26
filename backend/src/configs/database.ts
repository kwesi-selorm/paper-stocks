import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

export async function connectToDatabase() {
  mongoose.set('strictQuery', false)
  if (!process.env.MONGODB_URL) {
    throw new Error('process.env.MONGODB_URL is not defined')
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    require('../models/user')
    require('../models/asset')
    console.log('Connected successfully to the Paper Stocks database')
  } catch (e: unknown) {
    throw new Error(`Connection to the database failed: ${e}`)
  }
}
