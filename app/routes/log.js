import express from 'express'
import multer from 'multer'
import { Log } from '../models'

// Handles multipart/form-data
const upload = multer({ dest: 'uploads/' })
const router = express.Router()

router.use(upload.array(), (request, response, next) => {
  let log = new Log()
  log.ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress
  log.method = request.method
  log.url = request.originalUrl
  log.body = request.body
  console.log(log)
  log.save(error => { if (error) console.log(error) })
  next()
})

export default router
