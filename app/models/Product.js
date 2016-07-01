import mongoose, { Schema } from 'mongoose'

let schema = new Schema({
  lat: {
    type: Number,
    required: 'Latitude [lat] is required'
  },
  lng: {
    type: Number,
    required: 'Longitude [lng] is required'
  },
  zoom: {
    type: Number,
    required: 'Zoom is required'
  },
  bearing: Number,
  pitch: Number,
  email: {
    type: String,
    required: 'Email address is required',
    lowercase: true,
    trim: true,
    index: true
  },
  style: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  id: {
    type: String,
    index: { unique: true }
  }
})

export default mongoose.model('Product', schema)
