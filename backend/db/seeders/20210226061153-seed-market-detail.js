'use strict'
const { Stock } = require('../models')
const { readFileSync } = require('fs')
const dataString = readFileSync('./data/3-tickerMarketInfo.json', 'utf-8')
const marketData = JSON.parse(dataString)

async function mapMarketData() {
	return new Promise((res, rej) => {
		const mappedArray = []
		marketData.forEach(async (stock, i) => {
			const symbol = Object.keys(stock)[0]
			const [data] = await Stock.findAll({ where: { ticker: symbol } })
			stock = stock[symbol]
			mappedArray.push({
				stockId: data.dataValues.id,
				assets: stock.assets,
				debt: stock.debt,
				dividendYield: stock.dividendYield,
				grossProfit: stock.grossProfit,
				inventory: stock.inventory,
				netIncome: stock.netIncome,
				profitMargin: stock.profitMargin,
				operatingExpenses: stock.operatingExpenses,
				operatingIncome: stock.operatingIncome,
				priceEarnings: stock.priceEarnings,
				priceToEarningsRatio: stock.priceToEarningsRatio,
				revenues: stock.revenues,
				shares: stock.shares,
				incomeTaxExpense: stock.incomeTaxExpense,
				workingCapital: stock.workingCapital,
				salesPerShare: stock.salesPerShare,
				createdAt: new Date(),
				updatedAt: new Date(),
			})
			if (i === marketData.length - 1) res(mappedArray)
		})
	})
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('MarketDetails', await mapMarketData())
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('MarketDetails', null, {})
	},
}
