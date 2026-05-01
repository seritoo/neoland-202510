import { SystemError } from 'com'
import { StoryModel } from '../mongoose/index.js'

export function insertStory(storyData) {
const { author, title, shortStory, storyDate } = storyData

	const storyModel = new StoryModel({ owner: author, title, shortStory, storyDate})

	return storyModel.save()
		.catch(error => {throw new SystemError(error.message)})
		.then(storyModel => {})
}
