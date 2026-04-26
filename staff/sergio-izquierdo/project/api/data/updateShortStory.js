import { SystemError, ExistenceError} from 'com'
import { StoryModel } from '../mongoose/index.js'

export function updateShortStory(storyId, title, shortStory) {
	return StoryModel.updateOne({_id: storyId}, { $set: {title: title, shortStory: shortStory}})
		.catch(error => { throw new SystemError(error.message)})
		.then(result => {
			if(result.matchedCount === 0)
				throw new ExistenceError('Short story not found')
		})
}
