import { logic } from '../../logic/index.js'

export const getAllPublicStoriesHandler = (req, res, next) => {
	try {
		logic.getAllPublicStories()
			.then(stories => res.json(stories))
			.catch(next)
	} catch (error) {
		next(error)
	}
}
