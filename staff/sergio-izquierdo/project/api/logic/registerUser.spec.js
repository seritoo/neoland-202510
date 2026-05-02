import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData } from '../data/index.js'
import { logic } from './index.js'
import { ExistenceError, DuplicityError } from 'com'

describe('registerUser', () => {
	before(() => connect(process.env.TEST_DB_URL))

	let hashed = null

	beforeEach(() => Promise.all([
		data.deleteAllUsers(),
		data.deleteAllShortStories(),
		bcrypt.hash('123123123', 10).then(hash => hashed = hash)
	]))

	it('succeeds on a new user', () => {
		return logic.registerUser('Ser Gio', 'ser@gio.com', 'serito', '123123123', '123123123')
			.then(() => data.findUserByEmail('ser@gio.com'))
			.then(userData => {
				expect(userData).to.exist
				expect(userData.name).to.equal('Ser Gio')
				expect(userData.email).to.equal('ser@gio.com')
				expect(userData.username).to.equal('serito')

				return bcrypt.compare('123123123', userData.password)
			})
			.then(match => expect(match).to.be.true)
	})

	it('fails on existing user with same email', () => {
		let caught = null

		return data.insertUser(new UserData(null, 'Ser Gio', 'ser@gio.com', 'serito2', hashed, null, 'regular'))
			.then(() => logic.registerUser('Ser Gio', 'ser@gio.com', 'serito', '123123123', '123123123'))
			.catch(error => caught = error)
			.finally(() => {
				expect(caught).to.be.instanceOf(DuplicityError)
				expect(caught.message).to.equal('user e-mail already exists')
			})
	})

	it('fails on existing user with same username', () => {
		let caught = null

		return data.insertUser(new UserData(null, 'Ser Gio', 'sergio@ser.com', 'serito', hashed, null, 'regular'))
			.then(() => logic.registerUser('Ser Gio', 'ser@gio.com', 'serito', '123123123', '123123123'))
			.catch(error => caught = error)
			.finally(() => {
				expect(caught).to.be.instanceOf(DuplicityError)
				expect(caught.message).to.equal('user username already exists')
			})
	})
	afterEach(() => Promise.all([
		data.deleteAllUsers(),
		data.deleteAllShortStories()
	]))

	after(() => disconnect())
})
