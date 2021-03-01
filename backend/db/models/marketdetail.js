'use strict'
module.exports = (sequelize, DataTypes) => {
	const MarketDetail = sequelize.define('MarketDetail', {
		stockId: DataTypes.STRING,
		assets: DataTypes.INTEGER,
		debt: DataTypes.INTEGER,
		dividendYield: DataTypes.DECIMAL,
		grossProfit: DataTypes.INTEGER,
		inventory: DataTypes.INTEGER,
		netIncome: DataTypes.INTEGER,
		profitMargin: DataTypes.DECIMAL,
		operatingExpenses: DataTypes.INTEGER,
		operatingIncome: DataTypes.INTEGER,
		priceEarnings: DataTypes.DECIMAL,
		priceToEarningsRatio: DataTypes.DECIMAL,
		revenues: DataTypes.INTEGER,
		shares: DataTypes.INTEGER,
		incomeTaxExpense: DataTypes.INTEGER,
		workingCapital: DataTypes.INTEGER,
		salesPerShare: DataTypes.DECIMAL,
	})
	MarketDetail.associate = function (models) {
		MarketDetail.belongsTo(models.Stock, { foreignKey: 'stockId' })
	}
	return MarketDetail
}
