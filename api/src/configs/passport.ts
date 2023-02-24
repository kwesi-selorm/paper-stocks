import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import User from '../models/user'
import { decodePasswordHash } from '../utils/password'
import { UserRecord } from '../utils/types'

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const userRecord: UserRecord | null = await User.findOne({ username })
    if (userRecord == null) {
      return done(false, false, {
        message: 'Incorrect username or password'
      })
    }
    const isValidPassword = decodePasswordHash(
      password,
      userRecord.passwordSalt,
      userRecord.passwordHash
    )
    if (!isValidPassword) {
      return done(false, false, {
        message: 'Incorrect username or password'
      })
    }
    return done(null, userRecord)
  })
)

// TODO: Find more info on these methods
passport.serializeUser(async (user, cb) => {
  const userRecord = await User.findOne({ username: user.username })
  if (userRecord == null) {
    return cb(null, false)
  }
  process.nextTick(() => {
    return cb(null, userRecord._id)
  })
})

passport.deserializeUser(async (userId: string, cb) => {
  const userRecord = await User.findOne({ _id: userId })
  process.nextTick(() => {
    return cb(null, userRecord)
  })
})
