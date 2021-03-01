'use strict'
module.exports = (sequelize, DataTypes) => {
	const Position = sequelize.define(
		'Position',
		{
			userId: DataTypes.INTEGER,
			symbol: DataTypes.STRING,
			price: DataTypes.INTEGER,
			quantity: DataTypes.INTEGER,
		},
		{}
	)
	Position.associate = function (models) {
		Position.belongsTo(models.User, { foreignKey: 'userId' })
	}
	return Position
}
