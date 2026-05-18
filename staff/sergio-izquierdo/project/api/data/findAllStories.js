import { SystemError } from 'com'
import { StoryModel } from '../mongoose/index.js'
import { StoryData, UserData } from './models/index.js'

export function findAllStories() {
	return StoryModel.find().sort({ storyDate: -1 }).populate('owner', 'username name').lean()
		.catch(error => { throw new SystemError(error.message) })
		.then(storiesModel => storiesModel.map(storyModel => {
			const { _id, owner, title, shortStory, storyDate } = storyModel

			const author = new UserData ( owner._id.toString(), owner.name, null, owner.username, null, null, null)

			return new StoryData(_id.toString(), author, title, shortStory, storyDate)
		}))
}
