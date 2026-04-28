import { OwnershipError, validate } from 'com'
import { data } from '../data/index.js'

export function modifyShortStory(userId, storyId, title, shortStory) {
	validate.id(userId, 'userId')
	validate.id(storyId, 'storyId')
	validate.text(title, 'title')
	validate.text(shortStory,'shortStory')

	return data.findStoryById(storyId)
		.then(storyData => {
			if (storyData.author.id.toString() !== userId.toString()) throw new OwnershipError('Short Story do not belong user')

			return data.updateShortStory(storyId, title, shortStory)
		})
}
