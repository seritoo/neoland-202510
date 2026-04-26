import { logic } from "../../logic/index.js"

export const modifyShortStoryHandler = (req, res, next) => {
	try {
		const { userId, params:{ storyId}, body: { title, shortStory } } = req

		logic.modifyShortStory(userId, storyId, title, shortStory)
			.then(() => res.status(204).send())
			.catch(error => next(error))
	} catch (error) {
		next(error)
	}
}
