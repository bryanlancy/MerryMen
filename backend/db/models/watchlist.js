'use strict'
module.exports = (sequelize, DataTypes) => {
	const Watchlist = sequelize.define(
		'Watchlist',
		{
			userId: DataTypes.INTEGER,
			name: DataTypes.STRING,
			symbols: DataTypes.STRING,
		},
		{}
	)
	Watchlist.associate = function (models) {
		Watchlist.belongsTo(models.User, { foreignKey: 'userId' })
	}
	return Watchlist
}
