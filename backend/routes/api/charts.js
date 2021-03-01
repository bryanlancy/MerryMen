const axios = require('axios')
const { asyncHandler } = require('../../utils/utils')
const router = require('express').Router()

//localhost:5000/api/charts

//GET localhost:5000/api/charts/:symbol
router.get(
	'/:symbols',
	asyncHandler(async (req, res) => {
		const symbols = req.params.symbols
		const limit = symbols.split(',').length > 1 ? '100' : '100'
		const url = `https://data.alpaca.markets/v1/bars/day?symbols=${symbols}&limit=${limit}`
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
							const date = new Date(point.t * 1000)
							const formattedDate = `${date.getMonth() + 1}/${date.getDate() + 1}/${date.getFullYear().toString().slice(2)}`
							return { Time: formattedDate, Close: point.c, Open: point.o, High: point.h, Low: point.l }
						}),
					})
				}
				return stocks
			})
			.catch(error => error)
		res.json(data)
	})
)

module.exports = router
