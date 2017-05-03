import uuid from 'node-uuid'

export const PORT = process.env.PORT || 5000
export const SECRET = process.env.SECRET || uuid.v4()
export const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN
export const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY
export const SHOPIFY_PASSWORD = process.env.SHOPIFY_PASSWORD
if (!MAPBOX_ACCESS_TOKEN) throw new Error('MAPBOX_ACCESS_TOKEN is required')
if (!SHOPIFY_API_KEY) throw new Error('SHOPIFY_API_KEY is required')
if (!SHOPIFY_PASSWORD) throw new Error('SHOPIFY_PASSWORD is required')
