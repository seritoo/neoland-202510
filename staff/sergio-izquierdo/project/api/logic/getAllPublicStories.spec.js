import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData } from '../data/index.js'
import { StoryData } from '../data/models/StoryData.js'
import { logic } from './index.js'
import bcrypt from 'bcryptjs'

describe('getAllPublicStories', () => {
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
                    .then(() => logic.getAllPublicStories())
                    .then(stories => {
                        expect(stories).to.be.an('array')
                        expect(stories).to.have.lengthOf(2)
                        expect(stories[0].title).to.be.a('string')
                        expect(stories[0].shortStory).to.be.a('string')
                    })
            })
    })

    afterEach(() => Promise.all([
        data.deleteAllUsers(),
        data.deleteAllShortStories()
    ]))

    after(() => disconnect())
})
