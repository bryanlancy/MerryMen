'use strict'
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Stocks', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			ticker: {
				type: Sequelize.STRING(10),
				allowNull: false,
				unique: true,
			},
			name: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			url: {
				type: Sequelize.STRING(255),
			},
			logo: {
				type: Sequelize.STRING(255),
			},
			listdate: {
				type: Sequelize.DATE,
			},
			industry: {
				type: Sequelize.STRING(50),
			},
			sector: {
				type: Sequelize.STRING(50),
			},
			marketcap: {
				type: Sequelize.BIGINT,
			},
			employees: {
				type: Sequelize.INTEGER,
			},
			phone: {
				type: Sequelize.STRING(50),
			},
			ceo: {
				type: Sequelize.STRING(255),
			},
			description: {
				type: Sequelize.STRING(2500),
			},
			hq_address: {
				type: Sequelize.STRING(255),
			},
			tags: {
				type: Sequelize.ARRAY(Sequelize.STRING(255)),
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
		return queryInterface.dropTable('Stocks')
	},
}
