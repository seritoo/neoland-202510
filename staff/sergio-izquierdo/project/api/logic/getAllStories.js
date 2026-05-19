import { validate, ExistenceError } from 'com'
import { data } from '../data/index.js'
import { Story } from './models/index.js'

export function getAllStories(userId) {
	validate.id(userId, 'userId')

	return data.findUserById(userId)
		.then(userData => {
			if (!userData) throw new ExistenceError('user not found')

			return data.findAllStories()
		})
		.then(storiesData => {
			return storiesData.map(storyData => {
				const { id, author, title, shortStory, storyDate } = storyData

				const isOwner = userId.toString() === storyData.author.id.toString()

				return new Story(id, author, title, shortStory, storyDate, isOwner)
			})
		})
}
