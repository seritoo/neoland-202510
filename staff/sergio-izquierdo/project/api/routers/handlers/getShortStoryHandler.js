import { logic } from "../../logic/index.js"


export const getShortStoryHandler = (req, res, next) => {
	try {
		const {storyId} = req.params

		logic.getShortStory(storyId)
		.then(story => res.json(story))
		.catch(story => next(error))

	} catch (error) {
		next(error)
	}
}
