import { logic } from '../../logic/index.js'

export const getPetsHandler = (req, res, next) => {  // no hay jsonBodyParser porque estoy pidiendo datos
	try {
		const { userId } = rep

		logic.getPets(userId)
			.then(pets => res.json(pets))
			.catch(error => next(error))
	} catch (error) {
		next(error)
	}
}
