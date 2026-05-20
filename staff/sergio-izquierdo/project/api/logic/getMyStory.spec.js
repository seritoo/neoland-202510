import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData } from '../data/index.js'
import { StoryData } from '../data/models/StoryData.js'
import { logic } from './index.js'
import { ExistenceError, OwnershipError } from 'com'

describe('getMyStory', () => {
	before(() => connect(process.env.TEST_DB_URL))

	let hashed = null

	beforeEach(() => Promise.all([
		data.deleteAllUsers(),
		data.deleteAllShortStories(),
		bcrypt.hash('123123123', 10).then(hash => hashed = hash)
	]))

	it('succeeds on existing user and story', () => {
		return data.insertUser(new UserData(null, 'Ser Gio', 'ser@gio.com', 'serito', hashed, null, 'regular'))
			.then(() => data.findUserByEmail('ser@gio.com'))
			.then(userData => {
				return data.insertStory(new StoryData(null, userData.id, 'Mi primer relato', 'Érase una vez...', new Date()))
					.then(() => data.findStoriesByOwnerId(userData.id))
					.then(stories => logic.getMyStory(userData.id, stories[0].id))
					.then(story => {
						expect(story).to.exist
						expect(story.title).to.equal('Mi primer relato')
						expect(story.shortStory).to.equal('Érase una vez...')
						expect(story.isOwner).to.be.true
					})
			})
	})

	it('fails on non-existing user', () => {
		let caught = null

		return logic.getMyStory('012345678901234567890123', '012345678901234567890123')
			.catch(error => caught = error)
			.finally(() => {
				expect(caught).to.be.instanceOf(ExistenceError)
				expect(caught.message).to.equal('user not found')
			})
	})

	it('fails on non-existing story', () => {
		let caught = null

		return data.insertUser(new UserData(null, 'Ser Gio', 'ser@gio.com', 'serito', hashed, null, 'regular'))
			.then(() => data.findUserByEmail('ser@gio.com'))
			.then(userData => logic.getMyStory(userData.id, '012345678901234567890123'))
			.catch(error => caught = error)
			.finally(() => {
				expect(caught).to.be.instanceOf(ExistenceError)
				expect(caught.message).to.equal('Short Story not found')
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
            return data.insertStory(new StoryData(null, seritoData.id, 'Relato de Serito', 'Érase una vez...', new Date()))
                .then(() => data.findStoriesByOwnerId(seritoData.id))
                .then(storiesData => {
                    const [storyData] = storiesData

                    return data.findUserByEmail('ser@gio.com')
                        .then(sergioData => logic.getMyStory(sergioData.id, storyData.id))
                })
        })
        .catch(error => caught = error)
        .finally(() => {
            expect(caught).to.be.instanceOf(OwnershipError)
            expect(caught.message).to.equal('This Short Story do not belong to user')
        })
})

afterEach(() => Promise.all([
	data.deleteAllUsers(),
	data.deleteAllShortStories()
]))

after(() => disconnect())
})
