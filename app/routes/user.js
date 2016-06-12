import express from 'express'
import { User } from '../models'

let router = express.Router()

// Routes
router.use((request, response, next) => {
  console.log('Middleware User')
  next()
})

router.route('/')
  .get((request, response) => {
    // Returns all users as a list
    User.find({}, 'name', (error, users) => {
      if (error) return response.send(error)
      response.json(users)
    })
  })

  .post((request, response) => {
    // Creates a user
    let user = new User()
    user.name = request.body.name
    user.email = request.body.email

    user.save(error => {
      if (error) return response.send(error)
      response.json({message: `${ user.name } is created!`})
    })
  })

router.route('/:user_id')
  .get((request, response) => {
    // Returns a single users
    User.findOne({name: request.params.user_id}, 'name', (error, user) => {
      if (error) return response.send(error)
      response.json(user)
    })
  })

  .delete((request, response) => {
    // Deletes a user
    let name = request.params.user_id
    User.findOne({name: name}, 'name', (error, user) => {
      if (error) return response.send(error)
    }).remove((error => {
      if (error) return response.send(error)
      response.json({message: `${ name } is deleted!`})
    }))
  })


export default router
