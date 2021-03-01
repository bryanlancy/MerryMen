'use strict'
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('MarketDetails', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			stockId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				unique: true,
				references: { model: 'Stocks' },
			},
			assets: {
				type: Sequelize.BIGINT,
			},
			debt: {
				type: Sequelize.BIGINT,
			},
			dividendYield: {
				type: Sequelize.DECIMAL(8, 3),
			},
			grossProfit: {
				type: Sequelize.BIGINT,
			},
			inventory: {
				type: Sequelize.BIGINT,
			},
			netIncome: {
				type: Sequelize.BIGINT,
			},
			profitMargin: {
				type: Sequelize.DECIMAL(10, 3),
			},
			operatingExpenses: {
				type: Sequelize.BIGINT,
			},
			operatingIncome: {
				type: Sequelize.BIGINT,
			},
			priceEarnings: {
				type: Sequelize.DECIMAL(10, 3),
			},
			priceToEarningsRatio: {
				type: Sequelize.DECIMAL(10, 3),
			},
			revenues: {
				type: Sequelize.BIGINT,
			},
			shares: {
				type: Sequelize.BIGINT,
			},
			incomeTaxExpense: {
				type: Sequelize.BIGINT,
			},
			workingCapital: {
				type: Sequelize.BIGINT,
			},
			salesPerShare: {
				type: Sequelize.DECIMAL(10, 3),
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		})
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('MarketDetails')
	},
}
