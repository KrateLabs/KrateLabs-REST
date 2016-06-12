import express from 'express'

let router = express.Router()

// Routes
router.use((req, res, next) => {
  console.log('Middleware API')
  next()
})

router.get('/', (req, res) => {
  res.json({ message: 'hooray! welcome to our api!'})
})

router.get('/help', (req, res) => {
  res.json({ message: 'Help!'})
})

export default router
