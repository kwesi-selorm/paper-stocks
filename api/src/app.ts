import express from 'express'
import cookieParser from 'cookie-parser'
import indexRouter from './routes/index'
import usersRouter from './routes/users-routes'
import stocksRouter from './routes/stocks-routes'
import cors from 'cors'
import passport from 'passport'
import session from 'express-session'
import sessionConfigOptions from './configs/session'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(passport.initialize())
require('./configs/passport')
app.use(session(sessionConfigOptions))
app.use(passport.authenticate('session'))

app.use('/', indexRouter)
app.use('/api/users', usersRouter)
app.use('/api/stocks', stocksRouter)

export default app
