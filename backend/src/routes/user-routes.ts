import express = require('express')
import signUp from '../controllers/users/sign-up'
import signIn from '../controllers/users/sign-in'
import buyAsset from '../controllers/users/buy-asset'
import getAssets from '../controllers/users/get-assets'
import { generateToken, verifyToken } from '../middleware/jwt-auth'
import validateSignUpInput from '../validators/users/signup-validator'
import validateSignInInput from '../validators/users/signin-validator'
import { validateGetAssetsInput } from '../validators/users/get-assets-validator'
import validateBuyAssetInput from '../validators/users/buy-asset-validator'
const usersRouter = express.Router()

usersRouter.post('/signup', validateSignUpInput, generateToken, signUp)
usersRouter.post('/signin', validateSignInInput, generateToken, signIn)
usersRouter.post(
  '/buy-asset/:userId',
  validateBuyAssetInput,
  verifyToken,
  buyAsset
)
usersRouter.get(
  '/get-assets/:userId',
  validateGetAssetsInput,
  verifyToken,
  getAssets
)

export default usersRouter
