const uuid = require('node-uuid')

const PORT = process.env.PORT || 5000
const SECRET = process.env.SECRET || uuid.v4()
const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN
const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY
const SHOPIFY_PASSWORD = process.env.SHOPIFY_PASSWORD
const KRATELABS_USERNAME = process.env.KRATELABS_USERNAME
const KRATELABS_PASSWORD = process.env.KRATELABS_PASSWORD
if (!MAPBOX_ACCESS_TOKEN) throw new Error('MAPBOX_ACCESS_TOKEN is required')
if (!SHOPIFY_API_KEY) throw new Error('SHOPIFY_API_KEY is required')
if (!SHOPIFY_PASSWORD) throw new Error('SHOPIFY_PASSWORD is required')

module.exports = {
  PORT,
  SECRET,
  MAPBOX_ACCESS_TOKEN,
  SHOPIFY_API_KEY,
  SHOPIFY_PASSWORD,
  KRATELABS_USERNAME,
  KRATELABS_PASSWORD
}