'use strict'

function createSellOrders() {
	const type = ['market', 'limit', 'stop-limit']
	const symbol = ['GME', 'GOOG', 'AAPL']
	const users = ['Demo', 'James', 'Keith']
	const orderArray = []
	for (let i = 0; i < 100; i++) {
		const days = Math.floor(Math.random() * (60 - 1) + 1)
		orderArray.push({
			userId: Math.max(Math.floor(Math.random() * (users.length - 1)), 1),
			symbol: symbol[Math.floor(Math.random() * (type.length - 1))],
			price: (Math.random() * (15 - 1) + 2).toFixed(2),
			status: 'closed',
			isShared: Math.random() > 0.8 ? 'true' : 'false',
			quantity: Math.random() * 1000,
			createdAt: new Date(Date.now() - days * 1000 * 60 * 60 * 24),
			updatedAt: new Date(),
		})
	}
	return orderArray
}
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('SellOrders', createSellOrders())
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('SellOrders', null, {})
	},
}
