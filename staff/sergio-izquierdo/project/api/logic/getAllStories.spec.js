import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData } from '../data/index.js'
import { StoryData } from '../data/models/StoryData.js'
import { ExistenceError } from 'com'
import { logic } from './index.js'

describe('getAllStories', () => {
	before(() => connect(process.env.TEST_DB_URL))

	let hashed = null

	beforeEach(() => Promise.all([
		data.deleteAllUsers(),
		data.deleteAllShortStories(),
		bcrypt.hash('123123123', 10).then(hash => hashed = hash)
	]))

	it('succeeds and returns all stories', () => {
		return data.insertUser(new UserData(null, 'Ser Gio', 'ser@gio.com', 'serito', hashed, null, 'regular'))
			.then(() => data.findUserByEmail('ser@gio.com'))
			.then(userData => {
				return Promise.all([
					data.insertStory(new StoryData(null, userData.id, 'Primer relato', 'Érase una vez...', new Date())),
					data.insertStory(new StoryData(null, userData.id, 'Segundo relato', 'Había una vez...', new Date()))
				])
					.then(() => logic.getAllStories(userData.id))
					.then(stories => {
						expect(stories).to.be.an('array')
						expect(stories).to.have.lengthOf(2)

						const [first, second] = stories
						expect(first.title).to.be.a('string')
						expect(first.shortStory).to.be.a('string')
					})
			})
	})

	it('succeeds and marks isOwner true when userId matches', () => {
		return data.insertUser(new UserData(null, 'Ser Gio', 'ser@gio.com', 'serito', hashed, null, 'regular'))
			.then(() => data.findUserByEmail('ser@gio.com'))
			.then(userData => {
				return data.insertStory(new StoryData(null, userData.id, 'Mi relato', 'Érase una vez...', new Date()))
					.then(() => logic.getAllStories(userData.id))
					.then(stories => {
						expect(stories[0].isOwner).to.be.true
					})
			})
	})

	it('fails on non-existing user', () => {
		let caught = null

		return logic.getAllStories('012345678901234567890123')
			.catch(error => caught = error)
			.finally(() => {
				expect(caught).to.be.instanceOf(ExistenceError)
				expect(caught.message).to.equal('user not found')
			})
	})

	afterEach(() => Promise.all([
		data.deleteAllUsers(),
		data.deleteAllShortStories()
	]))

	after(() => disconnect())
})
