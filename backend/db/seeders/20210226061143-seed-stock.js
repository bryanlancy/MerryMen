'use strict'
const { readFileSync } = require('fs')
const dataString = readFileSync('./data/2-tickerWithDetails.json', 'utf-8')
const stockData = JSON.parse(dataString)

function mapStockData() {
	const test = stockData.map((stock, i) => {
		return {
			ticker: stock.ticker,
			name: stock.name,
			url: stock.url,
			logo: stock.logo,
			listdate: stock.listdate,
			industry: stock.industry,
			sector: stock.sector,
			marketcap: stock.marketcap,
			employees: stock.employees,
			phone: stock.phone,
			ceo: stock.ceo,
			description: stock.description,
			hq_address: stock.hq_address,
			tags: stock.tags.length ? stock.tags : [''],
			createdAt: new Date(),
			updatedAt: new Date(),
		}
	})
	return test
}

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Stocks', mapStockData())
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Stocks', null, {})
	},
}
