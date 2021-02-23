const axios = require('axios')
const { asyncHandler } = require('../../utils/utils')
const router = require('express').Router()

//localhost:5000/api/charts/list
router.get(
	'/list',
	asyncHandler(async (req, res) => {
		const symbols = req.query.symbols
		const url = `https://data.alpaca.markets/v1/bars/day?symbols=${symbols}&limit=10`
		const config = {
			headers: {
				'APCA-API-KEY-ID': process.env.APCA_API_KEY_ID,
				'APCA-API-SECRET-KEY': process.env.APCA_API_SECRET_KEY,
			},
		}
		const data = await axios
			.get(url, config)
			.then(res => {
				const stocks = []
				for (const stock in res.data) {
					stocks.push({
						[stock]: res.data[stock].map(point => {
							return { x: new Date(point.t * 1000), y: point.c, o: point.o }
						}),
					})
				}
				return stocks
			})
			.catch(error => error)
		res.json(data)
	})
)

//localhost:5000/api/charts/:symbol
router.get(
	'/:symbol',
	asyncHandler(async (req, res) => {
		console.log('SHOULDNT HIT ME')
		const symbol = req.params.symbol
		const url = `https://data.alpaca.markets/v1/bars/day?symbols=${symbol}&limit=100`
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
