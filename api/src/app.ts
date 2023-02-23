import express from 'express'
import cookieParser from 'cookie-parser'
import indexRouter from './routes/index'
import usersRouter from './routes/users'
import stocksRouter from './routes/stocks'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', indexRouter)
app.use('/api/users', usersRouter)
app.use('/api/stocks', stocksRouter)

export default app
