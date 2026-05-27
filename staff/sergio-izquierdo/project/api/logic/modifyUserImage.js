import {ExistenceError, validate} from 'com'
import { data, UserData} from '../data/index.js'

export function modifyUserImage(userId, image) {
	validate.id(userId, 'userId')
	validate.url(image, 'image')

	return data.findUserById(userId)
		.then(userData => {
			if (!userData) throw new ExistenceError('user not found')

			const { name, email, username, password, description } = userData

			return data.updateUser(new UserData(userId, name, email, username, password, image, description))
		})
}
