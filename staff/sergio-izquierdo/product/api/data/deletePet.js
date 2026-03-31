import { SystemError } from 'com'
import { PetModel } from '../models/index.js'

export function deletePet(petId) {
	return PetModel.deleteOne({ _id: petId })
		.catch(error => { throw new SystemError(error.message) })
		.then(result => { }) // si todo va bien recibimos un resultado que no devuelve nada
}
