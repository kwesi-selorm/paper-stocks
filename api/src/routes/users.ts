import express = require('express')
const usersRouter = express.Router()

/* GET users listing. */
usersRouter.get('/', function (req, res) {
  res.send({ Message: 'Hello World! ' })
})

export default usersRouter
