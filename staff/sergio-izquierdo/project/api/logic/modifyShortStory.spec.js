import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData } from '../data/index.js'
import { StoryData } from '../data/models/StoryData.js'
import { logic } from './index.js'
import { OwnershipError } from 'com'

describe('modifyShortStory', () => {
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
					.then(stories => logic.modifyShortStory(userData.id, stories[0].id, 'Título modificado', 'Contenido modificado'))
					.then(() => data.findStoriesByOwnerId(userData.id))
					.then(stories => {
						expect(stories[0].title).to.equal('Título modificado')
						expect(stories[0].shortStory).to.equal('Contenido modificado')
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
			.then(serseritoData => {
				return data.insertStory(new StoryData(null, serseritoData.id, 'Título modificado', 'Relato modificado'))
					.then(() => data.findStoriesByOwnerId(serseritoData.id))
					.then(storiesData => {
						const [storyData] = storiesData

						return data.findUserByEmail('ser@gio.com')
							.then(seritoData => logic.modifyShortStory(seritoData.id, storyData.id, 'Título de mi relato modificado', 'Mi relato modificado...'))
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
