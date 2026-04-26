import { logic } from '../../logic/index.js'

export const getMyStoryHandler = (req, res, next) => {
	try {
		const { userId, params: {storyId}} = req

		logic.getMyStory(userId, storyId)
		.then(story => res.json(story))
		.catch(error => next(error))
	} catch (error) {
		next(error)
	}
}
