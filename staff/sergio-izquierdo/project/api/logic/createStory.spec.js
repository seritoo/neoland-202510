import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData } from '../data/index.js'
import { logic } from './index.js'
import { ExistenceError } from 'com'

describe('createStory', () => {
	before(() => connect(process.env.TEST_DB_URL))

	let hashed = null

	beforeEach(() => Promise.all([
		data.deleteAllUsers(),
		data.deleteAllShortStories(),
		bcrypt.hash('123123123', 10).then(hash => hashed = hash)
	]))

	it('succeeds on existing user', () => {
		return data.insertUser(new UserData(null, 'Ser Gio', 'ser@gio.com', 'serito', hashed, null, 'regular'))
			.then(() => data.findUserByEmail('ser@gio.com'))
			.then(userData => {
				return logic.createStory(userData.id, 'Mi primer relato', 'Érase una vez...')
					.then(() => data.findStoriesByOwnerId(userData.id))
					.then(stories => {
						expect(stories).to.have.lengthOf(1)

						const [story] = stories
						expect(story.title).to.equal('Mi primer relato')
						expect(story.shortStory).to.equal('Érase una vez...')
						expect(story.author.id).to.equal(userData.id)
					})
			})
	})

	it('fails on non-existing user', () => {
		let caught = null

		return logic.createStory('012345678901234567890123', 'Mi primer relato', 'Érase una vez...')
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
