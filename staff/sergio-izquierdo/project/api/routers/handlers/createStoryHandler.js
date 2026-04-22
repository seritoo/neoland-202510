import { logic } from '../../logic/index.js'


export const createStoryHandler = (req, res, next) => {
	try {
		const { userId, body: {title, shortStory}} = req

		logic.createStory(userId, title, shortStory)
			.then(() => res.status(201).send())
			.catch(error => next(error))
	} catch (error) {
		next(error)
	}
}
