'use strict'
module.exports = (sequelize, DataTypes) => {
	const Stock = sequelize.define(
		'Stock',
		{
			ticker: DataTypes.STRING,
			name: DataTypes.STRING,
			url: DataTypes.STRING,
			logo: DataTypes.STRING,
			listdate: DataTypes.DATE,
			industry: DataTypes.STRING,
			sector: DataTypes.STRING,
			marketcap: DataTypes.INTEGER,
			employees: DataTypes.INTEGER,
			phone: DataTypes.STRING,
			ceo: DataTypes.STRING,
			description: DataTypes.STRING,
			hq_address: DataTypes.STRING,
			tags: DataTypes.STRING,
		},
		{}
	)
	Stock.associate = function (models) {
		Stock.hasOne(models.MarketDetail, { foreignKey: 'stockId' })
	}
	return Stock
}
