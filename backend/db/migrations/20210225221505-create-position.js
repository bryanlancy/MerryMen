'use strict'
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable(
			'Positions',
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				userId: {
					allowNull: false,
					unique: 'position_unique',
					type: Sequelize.INTEGER,
					references: { model: 'Users' },
				},
				symbol: {
					allowNull: false,
					unique: 'position_unique',
					type: Sequelize.STRING(10),
				},
				price: {
					allowNull: false,
					type: Sequelize.DECIMAL(20, 2),
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
			},
			{
				uniqueKeys: {
					position_unique: { fields: ['symbol', 'userId'] },
				},
			}
		)
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Positions')
	},
}
