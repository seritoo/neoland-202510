import { ExistenceError, validate } from 'com'
import { data } from '../data/index.js'

export function modifyUserDescription(userId, description) {
	validate.id(userId, 'userId')
	validate.text(description, 'description')

	return data.findUserById(userId)
		.then(userData => {
			if(!userData) throw new ExistenceError('user not found')

			return data.updateUserDescription(userId, description)
		})
}
