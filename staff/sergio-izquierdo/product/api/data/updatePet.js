import { SystemError } from 'com'
import { PetModel } from '../models/index.js'

export function updatePet(petData) {
	return PetModel.updateOne({ _id: petData.id }, { $set: petData })
		.catch(error => { throw new SystemError(error.message) })
		.then(result => { })
}
