const axios = require('axios')
const { asyncHandler } = require('../../utils/utils')
const router = require('express').Router()

//localhost:5000/api/charts/:symbol
router.get(
	'/:symbol',
	asyncHandler(async (req, res) => {
		const symbol = req.params.symbol
		const url = `https://data.alpaca.markets/v1/bars/day?symbols=${symbol}&limit=10`
		const config = {
			headers: {
				'APCA-API-KEY-ID': process.env.APCA_API_KEY_ID,
				'APCA-API-SECRET-KEY': process.env.APCA_API_SECRET_KEY,
			},
		}
		const data = await axios
			.get(url, config)
			.then(res =>
				res.data[symbol].map(point => {
					return { x: new Date(point.t * 1000), y: point.c }
				})
			)
			.catch(error => console.log('error', error))
		res.json(data)
	})
)

module.exports = router
