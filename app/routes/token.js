import express from 'express'
import { secret } from '../../config'
import { Token } from '../models'
import { sign } from 'jsonwebtoken'
import jwt from 'express-jwt'

const router = express.Router()

router.route('/')
  .get(jwt({ secret: secret }), (request, response) => {
    if (Math.floor(Date.now() / 1000) > request.user.iat) {
      return response.status(401).json({
        ok: false,
        status: 401,
        message: 'Token Expired'
      })
    }
    return response.json({
      ok: true,
      status: 200,
      message: 'User validated',
      user: request.user.user,
      email: request.user.email
    })
  })

  .post((request, response) => {
    let token = new Token(request.body)
    let error = token.validateSync()
    if (error) { return response.status(400).json(error) }

    if (token.grant_type == 'client_credentials') {
      let payload = {
        user: token.user || 'Anonymous',
        email: token.email || '',
        iat: Math.floor(Date.now() / 1000) + 60 * 60 * 24
      }
      return response.json({
        status: 200,
        ok: true,
        token: sign(payload, secret),
        message: 'Generated Token'
      })
    }
    return response.status(400).json({
      status: 400,
      ok: false,
      message: 'Invalid [grant_type]',
      error: 'Invalid [grant_type]'
    })
  })

export default router
