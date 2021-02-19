const express = require('express')
const router = express.Router()
const apiRouter = require('./api')

router.use('/api', apiRouter)

router.post('/test', function (req, res) {
	res.json({ requestBody: req.body })
})

router.get('/hello/world', function (req, res) {
	res.cookie('XSRF-TOKEN', req.csrfToken())
	const cookies = req.headers.cookie.split(';').map(x => x.split('='))
	res.send(`Hello World!<ul style="background-color:#ff88ff; border-radius:5px; padding: 25px; overflow:wrap">${cookies.map(cookie => `<li>${cookie[0]} == <b>${cookie[1]}</b></li>`)}</ul>`)
})

module.exports = router
