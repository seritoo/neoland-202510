import { validate } from 'com'
import { data } from '../data/index.js'
import { Story } from './models/index.js'


export function getAllStories(userId = null) {

	if(userId !== null)
	validate.id(userId, 'userId')

	return data.findAllStories()
		.then(storiesData => {
			return storiesData.map(storyData => {
				const { id, author, title, shortStory, storyDate} = storyData

				const isOwner = userId ? (userId.toString() === storyData.author.id.toString()) : false

				return new Story(id, author, title, shortStory, storyDate, isOwner)
			})
		})
}
