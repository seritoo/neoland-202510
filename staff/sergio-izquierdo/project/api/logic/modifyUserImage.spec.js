import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { connect, disconnect } from '../mongoose/index.js'
import { data, UserData } from '../data/index.js'
import { logic } from './index.js'
import { ExistenceError } from 'com'

describe('modifyUserImage', () => {
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
            .then(userData => logic.modifyUserImage(userData.id, 'https://image.com/123'))
            .then(() => data.findUserByEmail('ser@gio.com'))
            .then(userData => {
                expect(userData.image).to.equal('https://image.com/123')
            })
    })

    it('fails on non-existing user', () => {
        let caught = null

        return logic.modifyUserImage('012345678901234567890123', 'https://image.com/123')
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
