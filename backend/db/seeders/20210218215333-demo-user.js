'use strict'
const faker = require('faker')
const bcrypt = require('bcryptjs')

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Users',
			[
				{
					firstName: 'Dr.',
					lastName: 'Demo',
					username: 'Demo-lition',
					email: 'demo@user.io',
					cash: Math.floor(Math.random() * (100000 - 10000) + 10000),
					hashedPassword: bcrypt.hashSync('moneygoboom'),
				},
				{
					firstName: 'James',
					lastName: 'Aikens',
					username: 'lottsaslack',
					email: 'james@aikens.io',
					cash: Math.floor(Math.random() * (100000 - 10000) + 10000),
					hashedPassword: bcrypt.hashSync('password'),
				},
				{
					firstName: 'Keith',
					lastName: 'Taylor',
					username: 'kyth1906',
					email: 'keith@taylor.io',
					cash: Math.floor(Math.random() * (100000 - 10000) + 10000),
					hashedPassword: bcrypt.hashSync('password'),
				},
			],
			{}
		)
	},

	down: (queryInterface, Sequelize) => {
		const Op = Sequelize.Op
		return queryInterface.bulkDelete(
			'Users',
			{
				username: { [Op.in]: ['Demo-lition', 'lottsaslack', 'kyth1906'] },
			},
			{}
		)
	},
}
