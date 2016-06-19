import express from 'express'
import multer from 'multer'
import { exec } from 'child_process'
import AWS from 'aws-sdk'
import { Product, Log } from '../models'


// Adds handling for multipart/form-data
const upload = multer({ dest: 'uploads/' })
const router = express.Router()

router.use(upload.array(), (request, response, next) => {
  let log = new Log()
  log.ip = request.connection.remoteAddress
  log.method = request.method
  log.url = request.originalUrl
  log.body = request.body
  console.log(log)
  log.save(error => { if (error) console.log(error) })
  next()
})

router.route('/')
  .get((request, response) => {
    let product = new Product()
    response.json({
      api: 'Product',
      ok: true,
      status: 200,
      http: [
        { url: '/product', method: 'GET'},
        { url: '/product', method: 'POST', fields: ['lat', 'lng', 'zoom', 'bearing', 'pitch', 'email', 'location']},
        { url: '/product/:product_id', method: 'GET'},
        { url: '/product/:product_id', method: 'POST'},
        { url: '/product/:product_id', method: 'DELETE'},
      ]
    })
  })

  .post((request, response) => {
    let product = new Product(request.body)
    if (!product.id) { product.id = product._id }

    product.save(error => {
      if (error) return response.json({
        status: 500,
        ok: false,
        message: 'Error creating product',
        error: error
      })
      response.json({
        status: 200,
        ok: true,
        id: product.id,
        message: `Product is created!`,
        url: `/product/${ product.id }`
      })
    })
  })

router.route('/:product_id')
  .get((request, response) => {
    let product_id = request.params.product_id
    Product.findOne({ id: product_id }, { _id: 0, __v: 0 }, (error, product) => {
      if (error) return response.json({
        status: 500,
        ok: false,
        id: product_id,
        message: 'Error retrieving product',
        error: error
      })
      if (!product) return response.json({
        status: 404,
        ok: false,
        id: product_id,
        message: `Product was not found`,
        error: 'Product not found',
      })
      response.json({
        status: 200,
        ok: true,
        id: product.id,
        product: product
      })
    })
  })

  .delete((request, response) => {
    let product_id = request.params.product_id
    Product.findOne({id: product_id})
      .then(product => {
        if (!product) return response.json({
          status: 404,
          ok: false,
          id: product_id,
          message: `Product cannot be found`
        })
        product.remove((error, removed) => response.json({
          status: 200,
          ok: true,
          id: product_id,
          message: `Product is removed`
        }))
      })
  })

export default router
