import app from './app'
import http from 'http'
import * as dotenv from 'dotenv'
import connectToDatabase from './configs/database'
dotenv.config()

const port = process.env.PORT || '3000'
app.set('port', port)

const server: http.Server = http.createServer(app)

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

connectToDatabase()

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
