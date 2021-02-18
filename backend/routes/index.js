const express = require('express')
const router = express.Router()
const apiRouter = require('./api')

router.use('/api', apiRouter)

router.get('/hello/world', function (req, res) {
	res.cookie('XSRF-TOKEN', req.csrfToken())
	// console.log(req.headers.cookie.split(';').forEach(x => x.split('=')))
	res.send(`Hello World! token: ${res}`)
})

module.exports = router
