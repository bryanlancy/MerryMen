const express = require('express')
const router = express.Router()
const apiRouter = require('./api')

router.use('/api', apiRouter)

router.get('/hello/world', function (req, res) {
	res.cookie('XSRF-TOKEN', req.csrfToken())
	const cookies = req.headers.cookie.split(';').map(x => x.split('='))
	res.send(`Hello World!<ul style="background-color:#ff88ff; border-radius:5px; padding: 25px; overflow:wrap">${cookies.map(cookie => `<li>${cookie[0]} == <b>${cookie[1]}</b></li>`)}</ul>`)
})

if (process.env.NODE_ENV === 'production') {
	const path = require('path')
	// Serve the frontend's index.html file at the root route
	router.get('/', (req, res) => {
		res.cookie('XSRF-TOKEN', req.csrfToken())
		return res.sendFile(path.resolve(__dirname, '../../frontend', 'build', 'index.html'))
	})

	// Serve the static assets in the frontend's build folder
	router.use(express.static(path.resolve('../frontend/build')))

	// Serve the frontend's index.html file at all other routes NOT starting with /api
	router.get(/^(?!\/?api).*/, (req, res) => {
		res.cookie('XSRF-TOKEN', req.csrfToken())
		return res.sendFile(path.resolve(__dirname, '../../frontend', 'build', 'index.html'))
	})
}

if (process.env.NODE_ENV !== 'production') {
	router.get('/api/csrf/restore', (req, res) => {
		res.cookie('XSRF-TOKEN', req.csrfToken())
		return res.json({})
	})
}

module.exports = router
