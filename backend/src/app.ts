import express from 'express'
import cookieParser from 'cookie-parser'
import indexRouter from './routes/index'
import usersRouter from './routes/user-routes'
import stocksRouter from './routes/stock-routes'
import cors from 'cors'
import morgan from 'morgan'

const app = express()

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(morgan('combined'))

app.use('/', indexRouter)
app.use('/api/users', usersRouter)
app.use('/api/stocks', stocksRouter)

export default app
