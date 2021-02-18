const router = require('express').Router()
const chartRouter = require('./charts')
const sessionRouter = require('./session.js')
const usersRouter = require('./users.js')

router.use('/charts', chartRouter)
router.use('/session', sessionRouter)
router.use('/users', usersRouter)

module.exports = router
