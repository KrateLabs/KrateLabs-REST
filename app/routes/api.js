import express from 'express'

const router = express.Router()

// Routes
router.use((req, res, next) => {
  console.log('Middleware API')
  next()
})

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to Kratelabs\'s api!'})
})

router.get('/help', (req, res) => {
  res.json({ message: 'Help!'})
})

export default router
