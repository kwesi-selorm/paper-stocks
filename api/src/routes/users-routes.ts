import express = require('express')
import signUpUser from '../controllers/users/sign-up-user'
import validateUserSignUpInput from '../validators/users/user-signup-validator'
const usersRouter = express.Router()

/* GET users listing. */
usersRouter.get('/', function (req, res) {
  res.send({ Message: 'Hello World! ' })
})

usersRouter.post('/signup', validateUserSignUpInput, signUpUser)

export default usersRouter
