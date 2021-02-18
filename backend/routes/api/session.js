const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const { setTokenCookie, restoreUser } = require('../../utils/auth')
const { User } = require('../../db/models')

router.post(
	'/',
	asyncHandler(async (req, res, next) => {
		const { credential, password } = req.body

		const user = await User.login({ credential, password })

		if (!user) {
			const err = new Error('Login failed')
			err.status = 401
			err.title = 'Login failed'
			err.errors = ['The provided credentials were invalid.']
			return next(err)
		}

		await setTokenCookie(res, user)

		return res.json({
			user,
		})
	})
)
router.delete('/', (_req, res) => {
	res.clearCookie('token')
	return res.json({ message: 'success' })
})

module.exports = router

//q2yRdbts-8208Mx4ekk4BWT-VK4Dcd3kryTo
// fetch('/api/session', {
// 	method: 'POST',
// 	headers: {
// 		'Content-Type': 'application/json',
// 		'XSRF-TOKEN': `q2yRdbts-8208Mx4ekk4BWT-VK4Dcd3kryTo`,
// 	},
// 	body: JSON.stringify({ credential: 'Demo-lition', password: 'password' }),
// })
// 	.then(res => res.json())
// 	.then(data => console.log(data))

// fetch('/api/session', {
// 	method: 'DELETE',
// 	headers: {
// 		'Content-Type': 'application/json',
// 		'XSRF-TOKEN': `q2yRdbts-8208Mx4ekk4BWT-VK4Dcd3kryTo`,
// 	},
// })
// 	.then(res => res.json())
// 	.then(data => console.log(data))
