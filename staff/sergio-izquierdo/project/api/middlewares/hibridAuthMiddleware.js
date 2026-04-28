// helpers/optionalAuth.js
import jwt from 'jsonwebtoken'

export const hibridAuthMiddleware = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization

		if (authHeader) {
			const token = authHeader.slice(7)
			const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET)
			req.userId = userId
		} else {
			req.userId = null
		}
		next()
	} catch (error) {
		req.userId = null
		next()
	}
}
