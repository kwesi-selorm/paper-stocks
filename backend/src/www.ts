import app from './app'
import http from 'http'
import mongoose, { Error } from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || '3000'
app.set('port', port)

const server: http.Server = http.createServer(app)

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

if (!process.env.MONGODB_URL) {
  throw new Error('process.env.MONGODB_URL is not defined')
}
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URL).then()
require('../src/models/user')
require('../src/models/asset')

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = 'Pipe ' + port

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening() {
  console.log('Server listening on port ' + port)
}
