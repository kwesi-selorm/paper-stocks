import express = require('express')
import signUp from '../controllers/users/sign-up'
import validateUserSignUpInput from '../validators/users/signup-validator'
import passport from 'passport'
import signIn from '../controllers/users/sign-in'
const usersRouter = express.Router()

/* GET users listing. */
usersRouter.get('/', function (req, res) {
  res.send({ Message: 'Hello World! ' })
})

usersRouter.post('/signup', validateUserSignUpInput, signUp)

usersRouter.post('/signin', passport.authenticate('local'), signIn)

export default usersRouter
