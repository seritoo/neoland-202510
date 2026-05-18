import { validate } from 'com'
import { data } from '../data/index.js'
import { Story } from './models/index.js'

export function getAllPublicStories() {
	return data.findAllStories()
		.then(storiesData => {
			return storiesData.map(storyData => {
				const { id, author, title, shortStory, storyDate } = storyData

				const isOwner = false

				return new Story(id, author, title, shortStory, storyDate, isOwner)
			})
		})
}
