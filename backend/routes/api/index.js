const router = require('express').Router()
const chartRouter = require('./charts')
const sessionRouter = require('./session.js')
const usersRouter = require('./users.js')
const infoRouter = require('./info')

//localhost:5000/api/info
router.use('/info', infoRouter)
//localhost:5000/api/charts
router.use('/charts', chartRouter)

//localhost:5000/api/session
router.use('/session', sessionRouter)
//localhost:5000/api/users
router.use('/users', usersRouter)

module.exports = router
