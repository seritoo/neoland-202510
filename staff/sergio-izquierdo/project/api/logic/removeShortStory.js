import { validate, OwnershipError} from 'com'

import { data } from '../data/index.js'


export function removeShortStory(userId, storyId) {
	validate.id(userId, 'userId')
	validate.id(storyId, 'storyId')

	return data.findStoryById(storyId)
		.then(storyData => {
		if(storyData.author.id.toString() !== userId ) throw new OwnershipError('Short Story do not belong user')

		return data.deleteShortStory(storyId)
	})
}
