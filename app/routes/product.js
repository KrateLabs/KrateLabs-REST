import express from 'express'
import { User } from '../models'

let router = express.Router()

// Routes
router.use((req, res, next) => {
  console.log('Middleware User')
  next()
})

router.route('/')
  .get((req, res) => {
    res.json({ message: 'hooray! welcome to our product!'})
  })
  .post((req, res) => {
    let user = new User()
    user.name = req.body.name

    user.save( error => {
      if (error) return res.send(error)
      res.json({ message: 'created users!'})
    })
  })


export default router
