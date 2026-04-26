import { SystemError } from 'com'
import { StoryModel } from '../mongoose/index.js'
import { StoryData } from './models/index.js'

export function findStoryById(storyId) {
	return StoryModel.findById(storyId).populate('owner').lean()
		.catch(error => { throw new SystemError(error.message) })
		.then(storyModel => {
			if (!storyModel) return null
			const { _id, owner, title, shortStory, storyDate } = storyModel

			return new StoryData(_id, owner._id, owner.name, title, shortStory, storyDate)
		})
}

