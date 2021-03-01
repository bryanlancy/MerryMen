'use strict'
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('BuyOrders', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: { model: 'Users' },
			},
			type: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			symbol: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			price: {
				allowNull: false,
				type: Sequelize.DECIMAL(20, 2),
			},
			status: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			isShared: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
			},
			quantity: {
				allowNull: false,
				type: Sequelize.INTEGER,
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
		return queryInterface.dropTable('BuyOrders')
	},
}
