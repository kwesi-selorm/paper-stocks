import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import UserModel from '../models/user'
import { decodePasswordHash } from '../helpers/password-helper'
import { UserDocument } from '../utils/types'

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const userRecord: UserDocument | null = await UserModel.findOne({
      username
    })
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
