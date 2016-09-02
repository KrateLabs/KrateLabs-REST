import express from 'express'

const router = express.Router()

router.route('/')
  .get((request, response) => {
    response.json({
      api: 'Kratelabs v1.1.0',
      ok: true,
      status: 200,
      message: 'Demonstrates the Kratelabs API, yay!!',
      http: [
        { url: '/product', method: 'GET'},
        { url: '/token', method: 'GET'},
        { url: '/user', method: 'GET'}
      ]
    })
  })

export default router
