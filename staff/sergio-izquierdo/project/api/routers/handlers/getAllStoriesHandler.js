import { logic } from '../../logic/index.js'

export const getAllStoriesHandler = (req, res, next) => {
	try {
		const userId = req.userId

		logic.getAllStories(userId)
			.then(stories => res.json(stories))
			.catch(next)
	} catch (error) {
		next(error)
	}
}
