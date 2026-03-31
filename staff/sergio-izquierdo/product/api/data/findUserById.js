import { SystemError } from 'com'
import { UserModel } from '../models/index.js'
import { UserData } from './UserData.js'

export function findUserById(userId) {
	return UserModel.findById(userId)
		.catch(error => { throw new SystemError(error.message) })
		.then(userModel => {
			if (!userModel) return null

			const { id, name, email, username, password, image, role } = userModel

			return new UserData(id, name, email, username, password, image, role)
		})
}
