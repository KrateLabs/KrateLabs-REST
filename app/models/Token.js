import mongoose, { Schema } from 'mongoose'
import validator from 'validator'

let schema = new Schema({
  grant_type: {
    type: String,
    required: 'Grant Type is required',
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: 'Email address is required',
    lowercase: true,
    trim: true,
  },
  user: {
    type: String,
    trim: true
  }
})

schema.path('email').validate((email) => {
  return validator.isEmail(email)
}, 'Email is not valid')

schema.path('email').validate((email) => {
  return !/@aol.com/.test(email)
}, 'Must not be @aol.com')

schema.path('grant_type').validate((grant_type) => {
  return ['client_credentials'].indexOf(grant_type) !== -1
}, 'Invalid [grant_type]')

export default mongoose.model('Token', schema)
