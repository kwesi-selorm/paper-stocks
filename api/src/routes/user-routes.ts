import express = require('express')
import signUp from '../controllers/users/sign-up'
import passport from 'passport'
import signIn from '../controllers/users/sign-in'
import buyAsset from '../controllers/users/buy-asset'
import getAssets from '../controllers/users/get-assets'
const usersRouter = express.Router()

usersRouter.post('/signup', signUp)
usersRouter.post('/signin', passport.authenticate('local'), signIn)
usersRouter.post('/buy-asset/:userId', buyAsset)
usersRouter.get('/get-assets/:userId', getAssets)

export default usersRouter
