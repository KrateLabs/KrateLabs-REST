import mongoose, { Schema } from 'mongoose'

let schema = new Schema({
  name: {
    type: String,
    required: 'Name is required',
    trim: true
  },
  email: {
    type: String,
    required: 'Email address is required',
    lowercase: true,
    trim: true,
    index: { unique: true }
  }
})

export default mongoose.model('User', schema)
