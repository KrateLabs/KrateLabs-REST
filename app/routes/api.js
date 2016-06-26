import express from 'express'
import { secret } from '../../config'
import { } from '../models'
import { sign } from 'jsonwebtoken'
import jwt from 'express-jwt'

const router = express.Router()

router.route('/')
  .get((request, response) => {
    response.json({
      api: 'Kratelabs',
      ok: true,
      status: 200,
      message: 'Demonstrates the Kratelabs API',
      http: [
        { url: '/product', method: 'GET'},
        { url: '/token', method: 'GET'},
        { url: '/user', method: 'GET'}
      ]
    })
  })
})

export default router
