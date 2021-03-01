'use strict'
const symbols = ['GME', 'GOOG', 'AAPL']
const users = ['Demo', 'James', 'Keith']

function createPositions() {
	const positionArray = []
	users.forEach((user, i) => {
		symbols.forEach(symbol => {
			positionArray.push({
				userId: i + 1,
				symbol,
				price: (Math.random() * 25).toFixed(2),
				quantity: Math.floor(Math.random() * 1000),
				createdAt: new Date(),
				updatedAt: new Date(),
			})
		})
	})
	return positionArray
}

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Positions', createPositions())
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Positions', null, {})
	},
}
