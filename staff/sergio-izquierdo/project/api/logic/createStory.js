import { ExistenceError, validate } from 'com'

import { data } from '../data/index.js'
import { StoryData } from '../data/models/StoryData.js'


export function createStory(userId, title, shortStory) {
	validate.id(userId, 'userId')
	validate.text(title, 'title')
	validate.text(shortStory, 'shortStory')

	return data.findUserById(userId)
		.then(userData => {
			if (!userData) throw new ExistenceError('user not found')

			const story = new StoryData(null, userId,null, title, shortStory)

			return data.insertStory(story)
		})
}
