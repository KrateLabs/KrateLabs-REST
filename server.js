import express from 'express'
import multer from 'multer'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import autoIncrement from 'mongoose-auto-increment'
import jwt from 'express-jwt'
import routes from './app/routes'
import models from './app/models'
import { PORT, MONGODB, SECRET } from './config'
import { Log } from './app/models'

// Set up Server
const app = express()

app.use(bodyParser.json())
app.set('json spaces', 2)
app.use(bodyParser.urlencoded({ extended: true }))
app.set('trust proxy', true)

// Set up Database
mongoose.connect(MONGODB)
autoIncrement.initialize(mongoose.connection)

// Logging Middleware
const upload = multer({ dest: 'uploads/' })
app.use(upload.array(), (request, response, next) => {
  let log = new Log()
  log.ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress
  log.method = request.method
  log.url = request.originalUrl
  log.body = request.body
  console.log('auth', request.headers.authorization)
  console.log(log)
  next()
})

// CORS Middleware
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,Cache-Control,Accept,Accept-Encoding')
  next()
})

// Register Routes
app.use('/', routes.api)
app.use('/user', routes.user)
app.use('/token', routes.token)
app.use('/product', routes.product)
app.use('/github', routes.github)

// Token Authentication
app.use((error, request, response, next) => {
  console.log(error, 'error')
  if (error.name == 'UnauthorizedError') {
    return response.status(401).json({
      ok: false,
      status: 401,
      message: 'Invalid Token',
      error: error.inner.message
    })
  }
  next()
})

app.listen(PORT)
console.log(`MongoDB connected to: ${ MONGODB }`)
console.log(`Kratelabs HTTP [PORT]: ${ PORT }`)
console.log(`Kratelabs JWT [SECRET]: ${ SECRET }`)
