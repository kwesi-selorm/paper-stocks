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

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, { username: user.username })
  })
})

passport.deserializeUser(function (user: any, cb) {
  process.nextTick(() => {
    cb(null, { username: user.username })
  })
})
