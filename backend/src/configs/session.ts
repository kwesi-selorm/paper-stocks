import MongoStore from 'connect-mongo'
import * as dotenv from 'dotenv'
dotenv.config()

if (process.env.MONGODB_URL_PROD === undefined) {
  throw new Error('The MongoDB connection string is not defined')
}

const sessionConfigOptions = {
  secret: 'session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URL_PROD,
    touchAfter: 24 * 60 * 60, // Interval (in seconds) between session updates
    autoRemove: 'native', // Remove sessions when they expire
    ttl: 1000 * 60 * 60 * 24 * 7, // 1 week
    collectionName: 'sessions'
  })
}

export default sessionConfigOptions
