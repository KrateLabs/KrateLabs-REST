import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import stormpath from 'express-stormpath'
import routes from './app/routes'
import models from './app/models'

// Set up Server
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(stormpath.init(app, {
  web: {
    login: {
      enabled: true
    }
  }
}))
app.set('trust proxy', true)

// Server Config
const port = process.env.PORT || 8000
const router = express.Router()
const mongodb = process.env.MONGODB || 'mongodb://kratelabs:kratelabs@ds023052.mlab.com:23052/kratelabs'

// Set up Database
mongoose.connect(mongodb)

// Register Routes
app.use('/', routes.api)
app.use('/user', routes.user)
app.use('/product', routes.product)

app.on('stormpath.ready', () => {
  app.listen(port)
  console.log(`Stormpath Credentials active`)
  console.log(`MongoDB connected to: ${ mongodb }`)
  console.log(`Kratelabs API listening on port ${ port }`)
})
