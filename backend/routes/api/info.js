const router = require('express').Router()
const { MarketDetail, Stock } = require('../../db/models/')

//GET loclahost:5000/api/info/:symbol
router.get('/:symbol', async (req, res) => {
	const symbol = req.params.symbol
	const stockQuery = await Stock.findOne({
		where: {
			ticker: symbol,
		},
		raw: true,
	})
	let detailQuery = {}
	if (stockQuery) {
		detailQuery = await MarketDetail.findOne({
			where: {
				stockId: stockQuery.id,
			},
			raw: true,
		})
	}
	//hey stocks, SPREAD EM
	//you too details
	//now spread em together real nice like for me
	res.json({ ...stockQuery, ...detailQuery })
})

module.exports = router
