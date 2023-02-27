import mongoose, { Error } from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

function connectToDatabase() {
  if (
    process.env.MONGODB_URL_TEST === undefined ||
    process.env.MONGODB_URL_PROD === undefined
  ) {
    throw new Error('MongoDB connection string is not defined')
  }
  mongoose.set('strictQuery', false)
  if (process.env.NODE_ENV === 'prod') {
    mongoose.connect(process.env.MONGODB_URL_PROD, () => {
      console.log('Connected to MongoDB prod database')
    })
  } else {
    mongoose.connect(process.env.MONGODB_URL_TEST, () => {
      console.log('Connected to MongoDB test database')
    })
  }
  require('../models/user')
  require('../models/asset')
}

export default connectToDatabase
