import { ExistenceError, OwnershipError, validate } from 'com'
import { data } from "../data/index.js"
import { Story} from './models/index.js'

export function getMyStory(userId, storyId) {
	validate.id(userId, 'userId')
	validate.id(storyId, 'storyId')

	return data.findUserById(userId)
		.then(userData => {
			if (!userData) throw new ExistenceError('user not found')

			return data.findStoryById(storyId)
		})
		.then(storyData => {
			if (!storyData) throw new ExistenceError('Short Story not found')

			if (storyData.author.id.toString() !== userId.toString()) throw new OwnershipError('This Short Story do not belong to user')

			const { id, author, title, shortStory, storyDate} = storyData

			return new Story(id, author, title, shortStory, storyDate, true)
		})
}
