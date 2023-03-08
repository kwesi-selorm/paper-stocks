import express = require('express')
import signUp from '../controllers/users/sign-up'
import signIn from '../controllers/users/sign-in'
import buyAsset from '../controllers/users/buy-asset'
import getAssets from '../controllers/users/get-assets'
import { generateToken, verifyToken } from '../middleware/jwt-auth'
import sellAsset from '../controllers/users/sell-asset'
const usersRouter = express.Router()

usersRouter.post('/signup', generateToken, signUp)
usersRouter.post('/signin', generateToken, signIn)
usersRouter.post('/buy-asset/:userId', verifyToken, buyAsset)
usersRouter.post('/sell-asset/:userId', verifyToken, sellAsset)
usersRouter.get('/get-assets/:userId', verifyToken, getAssets)

export default usersRouter
