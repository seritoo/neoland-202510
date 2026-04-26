import { OwnershipError, validate } from 'com'
import { data } from '../data/index.js'

export function modifyShortStory(userId, storyId, title, shortStory) {
	validate.id(userId, 'userId')
	validate.id(storyId, 'storyId')
	validate.text(title, 'title')
	validate.text(shortStory,'shortStory')

	return data.findStoryById(storyId)
		.then(storyData => {
			if (storyData.ownerId.toString() !== userId.toString()) throw new OwnershipError('This Short Story do not belong to user')

			return data.updateShortStory(storyId, title, shortStory)
		})
}
