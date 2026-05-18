import { SystemError } from 'com'
import { StoryModel } from '../mongoose/index.js'
import { StoryData, UserData } from './models/index.js'

export function findStoryById(storyId) {
	return StoryModel.findById(storyId).populate('owner', 'name username description image').lean()
		.catch(error => { throw new SystemError(error.message) })
		.then(storyModel => {
			if (!storyModel) return null
			const { _id, owner, title, shortStory, storyDate } = storyModel

			const author = new UserData(owner._id.toString(), owner.name, null, owner.username, null, owner.image, owner.description)

			return new StoryData(_id.toString(), author, title, shortStory, storyDate)
		})
}
