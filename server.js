import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import routes from './app/routes'
import models from './app/models'

// Set up Server
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Server Config
const port = process.env.PORT || 8080
const router = express.Router()
const mongodb = process.env.MONGODB || 'mongodb://kratelabs:kratelabs@ds013414.mlab.com:13414/kratelabs'

// Set up Database
mongoose.connect(mongodb)

// Register Routes
app.use('/api', routes.api)
app.use('/user', routes.user)
app.use('/product', routes.product)

app.listen(port)
console.log('Magic happens on port ' + port)
