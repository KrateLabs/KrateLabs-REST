import mongoose, { Schema } from 'mongoose'

let schema = new Schema({
  lat: Number,
  lng: Number,
  zoom: Number,
  bearing: Number,
  pitch: Number,
  email: String,
  location: String,
  name: String
})

export default mongoose.model('Product', schema)
