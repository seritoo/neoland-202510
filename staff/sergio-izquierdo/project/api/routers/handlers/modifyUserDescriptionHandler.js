import { logic } from "../../logic/index.js"


export const modifyUserDescriptionHandler = (req, res, next) => {
	try {
		const { userId, body: { description } } = req

		logic.modifyUserDescription(userId, description)
			.then(() => res.status(204).send())
			.catch(error => next(error))
	} catch (error) {
		next(error)
	}
}
