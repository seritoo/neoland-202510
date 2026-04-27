import { data } from '../data/index.js'
import { Story } from './models/index.js'
import { ExistenceError, validate } from 'com'

export function getMyStories(userId) {
	validate.id(userId, 'userId')

	return data.findUserById(userId)
		.then(userData => {
			if (!userData) throw new ExistenceError('user not found')

			return data.findStoriesByOwnerId(userId)
		})
		.then(storiesData => {
			return storiesData.map(storyData => {

				const { id, author, title, shortStory, storyDate} = storyData

				const isOwner = true

				return new Story(id, author, title, shortStory, storyDate, isOwner)
			})
		})
}
