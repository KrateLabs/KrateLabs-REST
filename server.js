import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import routes from './app/routes'
import models from './app/models'

// Set up Server
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Server Config
const port = process.env.PORT || 8000
const router = express.Router()
const mongodb = process.env.MONGODB || 'mongodb://kratelabs:kratelabs@ds023052.mlab.com:23052/kratelabs'

// Set up Database
mongoose.connect(mongodb)

// Register Routes
app.use('/api', routes.api)
app.use('/user', routes.user)
app.use('/product', routes.product)

app.listen(port)
console.log(`MongoDB connected to: ${ mongodb }`)
console.log(`Kratelabs API listening on port ${ port }`)
