import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData } from '../data/index.js'
import { StoryData } from '../data/models/StoryData.js'
import { logic } from './index.js'
import { OwnershipError } from 'com'

describe('removeShortStory', () => {
	before(() => connect(process.env.TEST_DB_URL))

	let hashed = null

	beforeEach(() => Promise.all([
		data.deleteAllUsers(),
		data.deleteAllShortStories(),
		bcrypt.hash('123123123', 10).then(hash => hashed = hash)
	]))

	it('succeeds on existing story and owner', () => {
		return data.insertUser(new UserData(null, 'Ser Gio', 'ser@gio.com', 'serito', hashed, null, 'regular'))
			.then(() => data.findUserByEmail('ser@gio.com'))
			.then(userData => {
				return data.insertStory(new StoryData(null, userData.id, 'Mi primer relato', 'Érase una vez...', new Date()))
					.then(() => data.findStoriesByOwnerId(userData.id))
					.then(stories => logic.removeShortStory(userData.id, stories[0].id))
					.then(() => data.findStoriesByOwnerId(userData.id))
					.then(stories => {
						expect(stories).to.be.an('array')
						expect(stories).to.have.lengthOf(0)
					})
			})
	})

	it('fails when story does not belong to user', () => {
		let caught = null

		return Promise.all([
			data.insertUser(new UserData(null, 'Ser Gio', 'ser@gio.com', 'serito', hashed, null, 'regular')),
			data.insertUser(new UserData(null, 'Ser Serito', 'ser@serito.com', 'serserito', hashed, null, 'regular'))
		])
			.then(() => data.findUserByEmail('ser@serito.com'))
			.then(seritoData => {
				return data.insertStory(new StoryData(null, seritoData.id, 'Relato de Sergio', 'Érase una vez...', new Date()))
					.then(() => data.findStoriesByOwnerId(seritoData.id))
					.then(storiesData => {
						const [storyData] = storiesData

						return data.findUserByEmail('ser@gio.com')
							.then(sergioData => logic.removeShortStory(sergioData.id, storyData.id))
					})
			})
			.catch(error => caught = error)
			.finally(() => {
				expect(caught).to.be.instanceOf(OwnershipError)
				expect(caught.message).to.equal('Short Story do not belong user')
			})
	})

	afterEach(() => Promise.all([
		data.deleteAllUsers(),
		data.deleteAllShortStories()
	]))

	after(() => disconnect())
})
