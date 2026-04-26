import { ExistenceError, SystemError } from 'com'
import { StoryModel } from '../mongoose/index.js'

export function deleteShortStory(storyId) {
	return StoryModel.deleteOne({_id: storyId})
		.catch(error => {throw new SystemError(error.message)})
		.then(result => {
			if(result.deletedCount === 0)
				throw new ExistenceError('Short story not found')
		})
}
