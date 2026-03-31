import { SystemError } from 'com'
import { UserModel } from '../models/index.js'

export function updateUser(user) {
	return UserModel.updateOne({ _id: user.id }, { $set: user })
		.catch(error => { throw new SystemError(error.message) })
		.then(userModel => { })
}
