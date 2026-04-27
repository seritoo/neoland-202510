import { SystemError } from 'com'
import { StoryModel } from '../mongoose/index.js'

export function insertStory(storyData) {
const { ownerId, title, shortStory, storyDate} = storyData

	const storyModel = new StoryModel({ owner: ownerId, title, shortStory})

	return storyModel.save()
		.catch(error => {throw new SystemError(error.message)})
		.then(storyModel => {})
}
