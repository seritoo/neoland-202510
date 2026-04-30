import { validate } from 'com';
import { data } from '../data/index.js';
import { Story } from './models/index.js';


export function getShortStory(storyId) {
	validate.id(storyId, 'storyId')

	return data.findStoryById(storyId)
		.then(storyData => {
			if (!storyData) throw new ExistenceError('Short Story not found')

			const {id, author, title, shortStory, storyDate} = storyData

			return new Story(id, author, title, shortStory, storyDate, false)
		})
}
