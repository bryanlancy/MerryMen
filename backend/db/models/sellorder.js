'use strict'
module.exports = (sequelize, DataTypes) => {
	const SellOrder = sequelize.define(
		'SellOrder',
		{
			userId: DataTypes.INTEGER,
			symbol: DataTypes.STRING,
			price: DataTypes.INTEGER,
			status: DataTypes.STRING,
			isShared: DataTypes.BOOLEAN,
			quantity: DataTypes.INTEGER,
		},
		{}
	)
	SellOrder.associate = function (models) {
		SellOrder.belongsTo(models.User, { foreignKey: 'userId' })
	}
	return SellOrder
}
