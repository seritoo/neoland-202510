import { logic } from '../../logic/index.js'

export const getMyStoriesHandler = (req, res, next) => {
	try {
		const userId = req.userId

		logic.getMyStories(userId)
			.then(stories => res.json(stories))
			.catch(next)
	} catch (error) {
		next(error)
	}
}
