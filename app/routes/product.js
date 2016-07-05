import express from 'express'
import jwt from 'express-jwt'
import { SECRET } from '../../config'
import { Product } from '../models'
import Kratelabs from '../utils/Kratelabs'
import AWS from '../utils/AWS'
import Shopify from '../utils/Shopify'

const router = express.Router()
const aws = new AWS.S3({ bucket: 's3://api.kratelabs.com', recursive: true })
const shopify = new Shopify({
  apikey: '40676c7d883263065f21a0f02e926af4',
  password: '1b94c846c093bee5ef1a14a65e066450'
})
const kratelabs = new Kratelabs({
  access_token: 'pk.eyJ1IjoiYWRkeHkiLCJhIjoiY2lsdmt5NjZwMDFsdXZka3NzaGVrZDZtdCJ9.ZUE-LebQgHaBduVwL68IoQ',
  style: 'mapbox://styles/addxy/cim6u5lfi00k2cwm23exyzjim'
})

function validateProduct(request, response, next) {
  let product = new Product(request.body)
  let error = product.validateSync()
  if (error) {
    return response.status(400).json(_.assignIn(error, { ok: false, status: 400 }))
  }
  if (!request.body.id) {
    request.body.id = product._id
    console.log(request.body.id)
  }
  next()
}

function validateToken(request, response, next) {
  if (!request.user.email) {
    return response.status(401).json({
      ok: false,
      status: 401,
      message: 'Token invalid',
      error: 'Missing email from Token'
    })
  }
  next()
}

async function createMapProduct(request, response, next) {
  let product = new Product(request.body)
  let error = {
    status: 500,
    ok: false,
    message: 'Error creating product',
    error: 'Error Kratelabs CLI'
  }
  // Create Full Kratelab Style
  let full = await kratelabs.create({
    filename: `./uploads/products/${ product.id }/${ product.id }-full`,
    lat: product.lat,
    lng: product.lng,
    zoom: product.zoom,
    bearing: product.bearing,
    pitch: product.pitch,
    style: 'mapbox://styles/addxy/ciq40e6zx0010bkmbbo513b6s'
  })
  if (!full.ok) { return response.status(500).json(error) }

  // Create Water Kratelab Style
  let water = await kratelabs.create({
    filename: `./uploads/products/${ product.id }/${ product.id }-water`,
    lat: product.lat,
    lng: product.lng,
    zoom: product.zoom,
    bearing: product.bearing,
    pitch: product.pitch,
    style: 'mapbox://styles/addxy/ciq4i2skg000u7mnnpxcnpans'
  })
  if (!water.ok) { return response.status(500).json(error) }

  // Create Roads Kratelab Style
  let roads = await kratelabs.create({
    filename: `./uploads/products/${ product.id }/${ product.id }-roads`,
    lat: product.lat,
    lng: product.lng,
    zoom: product.zoom,
    bearing: product.bearing,
    pitch: product.pitch,
    style: 'mapbox://styles/addxy/ciq4kxagv0014banfo2989uep'
  })
  if (!roads.ok) { return response.status(500).json(error) }

  // Create Buildings Kratelab Style
  let buildings = await kratelabs.create({
    filename: `./uploads/products/${ product.id }/${ product.id }-buildings`,
    lat: product.lat,
    lng: product.lng,
    zoom: product.zoom,
    bearing: product.bearing,
    pitch: product.pitch,
    style: 'mapbox://styles/addxy/ciq4i1vdo001jb2niy9z38i9a'
  })
  if (!buildings.ok) { return response.status(500).json(error) }
  next()
}

function uploadAWS(request, response, next) {
  let product = new Product(request.body)

  aws.cp({
    source: `./uploads/products/${ product.id }`,
    target: `s3://api.kratelabs.com/products/${ product.id }`,
    publicReadWrite: true
  })
    .then(
      data => next(),
      error => {
        return response.status(500).json({
          status: 500,
          ok: false,
          message: 'Error creating product',
          error: 'Error AWS Upload'
        })
      })
}

function createShopifyProduct(request, response, next) {
  let product = new Product(request.body)

  shopify.createProduct({
    name: product.id,
    image: `https://s3.amazonaws.com/api.kratelabs.com/products/${ product.id }/${ product.id }`
  })
    .then(
      data => {
        request.body.shopify = data.product.id
        next()
      },
      error => {
        return response.status(500).json({
          status: 500,
          ok: false,
          message: 'Error creating product',
          error: 'Error Shopify API'
        })
      })
}

router.route('/')
  .get((request, response) => {
    response.json({
      api: 'Product',
      ok: true,
      status: 200,
      message: 'Demonstrates the Product API',
      http: [
        { url: '/product', method: 'GET'},
        { url: '/product', method: 'POST', fields: ['lat', 'lng', 'zoom', 'bearing', 'pitch', 'email', 'location']},
        { url: '/product/:product_id', method: 'GET'},
        { url: '/product/:product_id', method: 'POST'},
        { url: '/product/:product_id', method: 'DELETE'},
      ]
    })
  })

  .post(jwt({ secret: SECRET, issuer: 'https://api.kratelabs.com' }), validateToken)
  .post(validateProduct)
  .post(createMapProduct)
  .post(uploadAWS)
  .post(createShopifyProduct)
  .post((request, response, next) => {
    let product = new Product(request.body)

    // Save to DB
    product.save(error => {
      if (error) return response.status(500).json({
        status: 500,
        ok: false,
        message: 'Error creating product',
        error: error.errmsg
      })
      response.json({
        status: 200,
        ok: true,
        id: product.id,
        message: `Product created`,
        shopify: product.shopify,
        url: {
          svg: {
            full: `https://s3.amazonaws.com/api.kratelabs.com/products/${ product.id }/${ product.id }-full.svg`,
            roads: `https://s3.amazonaws.com/api.kratelabs.com/products/${ product.id }/${ product.id }-roads.svg`,
            water: `https://s3.amazonaws.com/api.kratelabs.com/products/${ product.id }/${ product.id }-water.svg`,
            buildings: `https://s3.amazonaws.com/api.kratelabs.com/products/${ product.id }/${ product.id }-buildings.svg`,
          },
          shopify: `https://kratelabs.com/products/${ product.id }`,
          api: `https://api.kratelabs.addxy.com/product/${ product.id }`
        }
      })
    })
  })

router.route('/:product_id')
  .get((request, response) => {
    let product_id = request.params.product_id
    Product.findOne({ id: product_id }, { _id: 0, __v: 0 }, (error, product) => {
      if (error) return response.status(500).json({
        status: 500,
        ok: false,
        id: product_id,
        message: 'Error retrieving product',
        error: error
      })
      if (!product) return response.status(404).json({
        status: 404,
        ok: false,
        id: product_id,
        message: `Product cannot be found`,
        error: 'Product cannot be found',
      })
      response.json({
        status: 200,
        ok: true,
        id: product.id,
        product: product,
        url: {
          svg: {
            full: `https://s3.amazonaws.com/api.kratelabs.com/products/${ product.id }/${ product.id }-full.svg`,
            roads: `https://s3.amazonaws.com/api.kratelabs.com/products/${ product.id }/${ product.id }-roads.svg`,
            water: `https://s3.amazonaws.com/api.kratelabs.com/products/${ product.id }/${ product.id }-water.svg`,
            buildings: `https://s3.amazonaws.com/api.kratelabs.com/products/${ product.id }/${ product.id }-buildings.svg`,
          },
          shopify: `https://kratelabs.com/products/${ product.id }`,
          api: `https://api.kratelabs.addxy.com/product/${ product.id }`
        }
      })
    })
  })

  .delete(jwt({ secret: SECRET, issuer: 'https://api.kratelabs.com' }), (request, response) => {
    let product_id = request.params.product_id
    Product.findOne({id: product_id})
      .then(product => {
        if (!product) return response.status(404).json({
          status: 404,
          ok: false,
          id: product_id,
          message: `Product cannot be found`,
          error: `Product cannot be found`
        })
        product.remove((error, removed) => response.json({
          status: 200,
          ok: true,
          id: product_id,
          message: `Product removed`
        }))
      })
    })

  .post((request, response) => {
    let product_id = request.params.product_id
    Product.update({id: product_id}, request.body, (error, product) => {
      if (!product.ok) return response.status(400).json({
        status: 400,
        ok: false,
        id: product_id,
        payload: request.body,
        message: 'Error updating product with payload',
        error: 'Error updating product'
      })
      if (!!!product.n) return response.status(404).json({
        status: 404,
        ok: false,
        id: product_id,
        message: `Product cannot be found`,
        error: `Product cannot be found`
      })
      if (error) return response.status(500).json({
        status: 500,
        ok: false,
        id: product_id,
        message: 'Error updating product',
        error: error
      })
      response.json({
        status: 200,
        ok: true,
        id: product_id,
        payload: request.body,
        message: 'Product updated'
      })
    })
  })

export default router
