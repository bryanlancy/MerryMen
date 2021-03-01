'use strict'
const { Validator } = require('sequelize')
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [1, 30],
				},
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [1, 30],
				},
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [4, 30],
					isNotEmail(value) {
						if (Validator.isEmail(value)) {
							throw new Error('Cannot be an email.')
						}
					},
				},
			},
			cash: {
				type: DataTypes.DECIMAL,
				defaultValue: 10000.0,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [3, 256],
				},
			},
			hashedPassword: {
				type: DataTypes.STRING.BINARY,
				allowNull: false,
				validate: {
					len: [60, 60],
				},
			},
		},
		{
			defaultScope: {
				attributes: {
					exclude: ['hashedPassword', 'email', 'cash', 'createdAt', 'updatedAt'],
				},
			},
			scopes: {
				currentUser: {
					attributes: { exclude: ['hashedPassword'] },
				},
				loginUser: {
					attributes: {},
				},
			},
		}
	)
	User.associate = function (models) {
		User.hasMany(models.Watchlist, { foreignKey: 'userId' })
		User.hasMany(models.BuyOrder, { foreignKey: 'userId' })
		User.hasMany(models.SellOrder, { foreignKey: 'userId' })
		User.hasMany(models.Position, { foreignKey: 'userId' })
	}
	User.prototype.toSafeObject = function () {
		// remember, this cannot be an arrow function
		const { id, firstName, lastName, username, email, cash } = this // context will be the User instance
		return { id, firstName, lastName, username, email, cash }
	}
	User.prototype.validatePassword = function (password) {
		return bcrypt.compareSync(password, this.hashedPassword.toString())
	}
	User.getCurrentUserById = async function (id) {
		return await User.scope('currentUser').findByPk(id)
	}
	User.login = async function ({ credential, password }) {
		const { Op } = require('sequelize')
		const user = await User.scope('loginUser').findOne({
			where: {
				[Op.or]: {
					username: credential,
					email: credential,
				},
			},
		})
		if (user && user.validatePassword(password)) {
			return await User.scope('currentUser').findByPk(user.id)
		}
	}
	User.signup = async function ({ username, email, password, firstName, lastName }) {
		const hashedPassword = bcrypt.hashSync(password)
		const user = await User.create({
			firstName,
			lastName,
			username,
			email,
			hashedPassword,
		})
		return await User.scope('currentUser').findByPk(user.id)
	}
	return User
}
