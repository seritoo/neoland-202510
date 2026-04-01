import { ExistenceError, validate } from 'com'
import { data } from '../data/index.js'
import { User } from './models/index.js'

export function getUser(userId) {  // permite recuperara un usuario por id
	validate.id(userId, 'userId')

	return data.findUserById(userId)
		.then(userData => {
			if (!userData) throw new ExistenceError('user not found')

			const { name, email, username, image, role } = userData

			return new User(userId, name, email, username, image, role) // nos quedamos con los datos públicos, no con el password
		})
}
