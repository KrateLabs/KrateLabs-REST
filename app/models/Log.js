import mongoose, { Schema } from 'mongoose'

let schema = new Schema({
  ip: String,
  url: String,
  method: String,
  body: Object,
  auth: String,
  userAgent: Object
})

export default mongoose.model('Log', schema)
