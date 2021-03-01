'use strict'
module.exports = (sequelize, DataTypes) => {
	const BuyOrder = sequelize.define(
		'BuyOrder',
		{
			userId: DataTypes.INTEGER,
			type: DataTypes.STRING,
			symbol: DataTypes.STRING,
			price: DataTypes.INTEGER,
			status: DataTypes.STRING,
			isShared: DataTypes.BOOLEAN,
			quantity: DataTypes.INTEGER,
		},
		{}
	)
	BuyOrder.associate = function (models) {
		BuyOrder.belongsTo(models.User, { foreignKey: 'userId' })
	}
	return BuyOrder
}
