import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData } from '../data/index.js'
import { StoryData } from '../data/models/StoryData.js'
import { logic } from './index.js'
import { ExistenceError } from 'com'

describe('getShortStory', () => {
	before(() => connect(process.env.TEST_DB_URL))

	let hashed = null

	beforeEach(() => Promise.all([
		data.deleteAllUsers(),
		data.deleteAllShortStories(),
		bcrypt.hash('123123123', 10).then(hash => hashed = hash)
	]))

	it('succeeds on existing story', () => {
		return data.insertUser(new UserData(null, 'Ser Gio', 'ser@gio.com', 'serito', hashed, null, 'regular'))
			.then(() => data.findUserByEmail('ser@gio.com'))
			.then(userData => {
				return data.insertStory(new StoryData(null, userData.id, 'Mi primer relato', 'Érase una vez...', new Date()))
					.then(() => data.findStoriesByOwnerId(userData.id))
					.then(stories => logic.getShortStory(stories[0].id))
					.then(story => {
						expect(story).to.exist
						expect(story.title).to.equal('Mi primer relato')
						expect(story.shortStory).to.equal('Érase una vez...')
						expect(story.isOwner).to.be.false
					})
			})
	})

	it('fails on non-existing story', () => {
		let caught = null

		return logic.getShortStory('012345678901234567890123')
			.catch(error => caught = error)
			.finally(() => {
				expect(caught).to.be.instanceOf(ExistenceError)
				expect(caught.message).to.equal('Short Story not found')
			})
	})

	afterEach(() => Promise.all([
		data.deleteAllUsers(),
		data.deleteAllShortStories()
	]))

	after(() => disconnect())
})
