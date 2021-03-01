'use strict'

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Watchlists', [
			{
				userId: 1,
				name: 'Test Watchlist',
				symbols: ['AAPL', 'GME', 'GOOG'],
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 1,
				name: 'Test Watchlist 2',
				symbols: ['GME', 'AAPL', 'GOOG'],
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 1,
				name: 'Test Watchlist 3',
				symbols: ['GOOG', 'GME', 'AAPL'],
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 2,
				name: 'Test Watchlist',
				symbols: ['AAPL', 'GME', 'GOOG'],
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 3,
				name: 'Test Watchlist',
				symbols: ['AAPL', 'GME', 'GOOG'],
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 3,
				name: 'Test Watchlist 2',
				symbols: ['GME', 'AAPL', 'GOOG'],
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		])
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Watchlists', null, {})
	},
}
