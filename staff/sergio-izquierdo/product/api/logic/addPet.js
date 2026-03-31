import { ExistenceError, validate } from 'com'
import { data, PetData } from '../data/index.js'

export function addPet(userId, name, birthdate, weight, image) {
	validate.id(userId, 'userId')
	validate.name(name)
	validate.date(birthdate, 'birthdate')
	validate.number(weight, 'weight')
	validate.url(image, 'image')

	return data.findUserById(userId)
		.then(userData => {
			if (!userData) throw new ExistenceError('user not found')

			const pet = new PetData(null, userId, name, birthdate, weight, image)

			return data.insertPet(pet)
		})
}
