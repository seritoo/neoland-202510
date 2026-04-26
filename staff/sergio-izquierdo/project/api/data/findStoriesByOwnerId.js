import { SystemError } from 'com'
import { StoryModel } from '../mongoose/index.js'
import { StoryData } from "./models/index.js"

export function findStoriesByOwnerId(userId) {
	return StoryModel.find({ owner: userId}).lean()
		.catch(error => {throw new SystemError(error.message)})
		.then(storiesModel => storiesModel.map(storyModel => {
			const {_id, owner, title, shortStory, storyDate} = storyModel

			return new StoryData(_id, owner,null, title, shortStory, storyDate)
		}))
}
