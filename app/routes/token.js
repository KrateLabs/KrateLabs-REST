import _ from 'lodash'
import { Base64 } from 'js-base64'
import express from 'express'
import jwt from 'express-jwt'
import { sign } from 'jsonwebtoken'
import { SECRET } from '../../config'
import { Token } from '../models'

const router = express.Router()

router.route('/validate')
  .get(jwt({ secret: SECRET, issuer: 'https://api.kratelabs.com' }), (request, response) => {
    return response.json({
      ok: true,
      status: 200,
      message: 'User validated',
      user: request.user.user,
      email: request.user.email
    })
  })
  .post(jwt({ secret: SECRET, issuer: 'https://api.kratelabs.com' }), (request, response) => {
    return response.json({
      ok: true,
      status: 200,
      message: 'User validated',
      user: request.user.user,
      email: request.user.email
    })
  })

// Validate Authorization
router.route('/')
  .post((request, response, next) => {
    if (!request.headers.authorization) {
      return response.status(401).json({
        ok: false,
        status: 401,
        message: 'Must provide Authorization'
      })
    }
    let [scheme, credentials] = request.headers.authorization.split(' ')
    if (!/^Basic$/i.test(scheme)) {
      return response.status(401).json({
        ok: false,
        status: 401,
        message: 'Must provide Basic Authorization'
      })
    }
    let [username, password] = Base64.decode(credentials).split(':')
    if (username != 'Kratelabs' || password != 'Kratelabs') {
      return response.status(401).json({
        ok: false,
        status: 401,
        message: 'Invalid Credentials'
      })
    }
    next()
  })

router.route('/')
  .get((request, response) => {
    response.json({
      api: 'Token',
      ok: true,
      status: 200,
      message: 'Demonstrates the Token API',
      http: [
        { url: '/token', method: 'GET'},
        { url: '/token', method: 'POST', fields: ['user', 'email', 'client_credentials']},
        { url: '/token/validate', method: 'GET'},
        { url: '/token/validate', method: 'POST'}
      ]
    })
  })
  .post((request, response) => {
    let token = new Token(request.body)
    let error = token.validateSync()
    if (error) { return response.status(400).json(_.assignIn(error, { ok: false, status: 400 })) }

    if (token.grant_type == 'client_credentials') {
      let payload = {
        user: token.user || 'Anonymous',
        email: token.email || ''
      }
      let options = {
        expiresIn: '365 days',
        issuer: 'https://api.kratelabs.com'
      }
      return response.json({
        status: 200,
        ok: true,
        token: sign(payload, SECRET, options),
        message: 'Generated Token'
      })
    }
  })

export default router
