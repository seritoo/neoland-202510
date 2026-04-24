import { ExistenceError, SystemError } from 'com'
import { UserModel } from '../mongoose/index.js'

export function updateUserDescription(userId, description) {
	return UserModel.updateOne({ _id: userId }, { $set: { description: description } })
		.catch(error => {throw new SystemError(error.message)})
		.then(result => {
			if(result.matchedCount === 0)
				throw new ExistenceError('user not found')
		})
}
