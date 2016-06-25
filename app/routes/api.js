import express from 'express'
import { secret } from '../../config'
import { } from '../models'
import { sign } from 'jsonwebtoken'
import jwt from 'express-jwt'

const router = express.Router()

router.get('/', (request, response) => {
  response.json({ message: 'Welcome to Kratelabs\'s api!'})
})

export default router
