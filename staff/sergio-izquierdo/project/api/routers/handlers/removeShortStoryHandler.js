import { logic } from "../../logic/index.js"

export const removeShortStoryHandler = (req, res, next) => {
	try {
		const { userId, params: { storyId } } = req

		logic.removeShortStory(userId, storyId)
			.then(() => res.status(204).send())
			.catch(error => next(error))
	} catch (error) {
		next(error)
	}
}
