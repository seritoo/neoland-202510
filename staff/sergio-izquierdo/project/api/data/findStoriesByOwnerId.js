import { SystemError } from 'com'
import { StoryModel } from '../mongoose/index.js'
import { StoryData } from "./models/index.js"

export function findStoriesByOwnerId(userId) {
	return StoryModel.find({ owner: userId}).populate('owner').lean()
		.catch(error => {throw new SystemError(error.message)})
		.then(storiesModel => storiesModel.map(storyModel => {
			const {_id, owner, title, shortStory, storyDate} = storyModel

			const author = {
				id: owner._id.toString(),
				username: owner.username,
				name: owner.name
			}
			return new StoryData(_id, author, title, shortStory, storyDate)
		}))
}
