import express from 'express'
import { User, Log } from '../models'
import multer from 'multer'

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
    // Returns all users as a list
    User.find({}, 'name', (error, users) => {
      if (error) return response.json({
        status: 500,
        ok: false,
        message: 'Error retrieving multiple users',
        error: error
      })
      if (!users) return response.json({
        status: 404,
        ok: false,
        message: 'Users not found',
        error: 'Users not found'
      })
      response.json({
        status: 200,
        ok: true,
        users: users
      })
    })
  })

  .post((request, response) => {
    // Creates a user
    let user = new User(request.body)

    user.save(error => {
      if (error) return response.json({
        status: 500,
        ok: false,
        message: 'Error creating user',
        error: error
      })
      response.json({
        status: 200,
        ok: true,
        id: user.email,
        message: `User ${ user.name } is created!`
      })
    })
  })

router.route('/:user_id')
  .get((request, response) => {
    // Returns a single users
    let name = request.params.user_id
    User.findOne({name: name}, 'name', (error, user) => {
      if (error) return response.json({
        status: 500,
        ok: false,
        message: 'Error retrieving user',
        error: error
      })
      if (!user) return response.json({
        status: 404,
        ok: false,
        message: `User [${ name }] was not found`,
        error: 'User not found',
      })
      response.json({
        status: 200,
        ok: true,
        user: user
      })
    })
  })

  .delete((request, response) => {
    // Deletes a user
    let name = request.params.user_id
    User.findOne({name: name}, 'name')
      .then(user => {
        if (!user) return response.json({
          status: 404,
          ok: false,
          message: `User ${ name } cannot be found`
        })
        user.remove((error, removed) => response.json({
          status: 200,
          ok: true,
          message: `User ${ name } is removed`
        }))
      })
  })

export default router
