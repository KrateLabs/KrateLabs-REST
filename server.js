import express from 'express'
import multer from 'multer'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import stormpath from 'express-stormpath'
import jwt from 'express-jwt'
import routes from './app/routes'
import models from './app/models'
import { port, mongodb, secret } from './config'
import { Log } from './app/models'

// Set up Server
const app = express()
app.use(bodyParser.json())
app.set('json spaces', 2)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(stormpath.init(app, {
  web: {
    login: {
      enabled: true
    }
  }
}))
app.set('trust proxy', true)

// Set up Database
mongoose.connect(mongodb)

// Logging Middleware
const upload = multer({ dest: 'uploads/' })
app.use(upload.array(), (request, response, next) => {
  let log = new Log()
  log.ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress
  log.method = request.method
  log.url = request.originalUrl
  log.body = request.body
  console.log(log)
  next()
})

// Register Routes
app.use('/', routes.api)
app.use('/user', routes.user)
app.use('/product', routes.product)

app.on('stormpath.ready', () => {
  app.listen(port)
  console.log(`Stormpath Credentials active`)
  console.log(`MongoDB connected to: ${ mongodb }`)
  console.log(`Kratelabs API HTTP port: ${ port }`)
  console.log(`Kratelabs JWT secret: ${ secret }`)
})
