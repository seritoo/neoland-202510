import { data, User, Pet } from './data.js'

import { DuplicityError, ExistenceError, CredentialError, OwnershipError } from './errors.js'
import { validate } from './validate.js'


class Logic {
    registerUser(name, email, username, password, passwordRepeat) {
        validate.name(name)
        validate.email(email)
        validate.username(username)
        validate.password(password)
        validate.password(passwordRepeat, 'passwordRepeat')
        validate.match(password, passwordRepeat, 'password', 'passwordRepeat')

        return data.findUserByEmail(email)
            .then(user => {
                if (user !== null) throw new DuplicityError('user already exists')

				return data.findUserByUsername(username)
            })
			.then(user => {
				if (user !== null) throw new DuplicityError('user username already exists')

				user = new User(null, name, email, username, password, null, 'regular')

				return data.insertUser(user)
			})
    }

    authenticateUser(username, password) {
        validate.username(username)
        validate.password(password)

        return data.findUserByUsername(username)
			.then(user => {
				if (user === null) throw new ExistenceError('user not found')

        		if (user.password !== password) throw new CredentialError('incorrect password')

        		return user.id
			})
    }

    changeUserEmail(userId, email, newEmail, newEmailRepeat) {
        validate.id(userId, 'userId')
        validate.email(email)
        validate.email(newEmail, 'newEmail')
        validate.email(newEmailRepeat, 'newEmailRepeat')
        validate.match(newEmail, newEmailRepeat, 'newEmail', 'newEmailRepeat')

        return data.findUserById(userId)
            .then(user => {
                if (!user) throw new ExistenceError('user not found')

                if (user.email !== email) throw new OwnershipError('email do not belong to user')

				return data.findUserByEmail(newEmail)
					.then(otherUser => {
						if (otherUser) throw new OwnershipError('newEmail belongs to another user')

						const { name, username, password, image, role } = user

						return data.updateUser(new User(userId, name, newEmail, username, password, image, role))
					})
            })
    }

    changeUserPassword(userId, password, newPassword, newPasswordRepeat) {
        validate.id(userId, 'userId')
        validate.password(password)
        validate.password(newPassword, 'newPassword')
        validate.password(newPasswordRepeat, 'newPasswordRepeat')
        validate.match(newPassword, newPasswordRepeat, 'newPassword', 'newPasswordRepeat')

		return data.findUserById(userId)
            .then(user => {
                if (!user) throw new ExistenceError('user not found')

		        if (user.password !== password) throw new CredentialError('incorrect password')

						const { name, email, username, image, role } = user

						data.updateUser(new User(userId, name, email, username, newPassword, image, role))
					})
    }

	getUser(userId) {  // permite recuperara un usuario por id
        validate.id(userId, 'userId')

        return data.findUserById(userId)
			.then(user => {
				if (!user) throw new ExistenceError('user not found')

        const { name, email, username, image, role } = user

        return { name, email, username, image, role } // nos quedamos con los datos públicos, no con el password
			})
    }

	changeUserImage(userId, image) {
		validate.id(userId, 'userId')
		validate.url(image, 'image')

		return data.findUserById(userId)
			.then(user => {
				if (!user) throw new ExistenceError('user not found')

				const { name, email, username, password, role } = user

				return data.updateUser(new User(userId, name, email, username, password, image, role))
			})
	}


    addPet(userId, name, birthdate, weight, image) {
        validate.id(userId, 'userId')
        validate.name(name)
        validate.date(birthdate, 'birthdate')
        validate.number(weight, 'weight')
        validate.url(image, 'image')

        const user = data.findUserById(userId)
        if (user === null) throw new ExistenceError('user not found')

        const pet = new Pet('pet-' + data.petsCount, userId, name, birthdate, weight, image)

        data.insertPet(pet)
    }

    getPets(userId) {
        validate.id(userId, 'userId')

        const user = data.findUserById(userId)
        if (!user) throw new ExistenceError('user not found')

        const pets = data.findPetsByUserId(userId)

        return pets
    }

    removePet(userId, petId) {
        validate.id(userId, 'userId')
        validate.id(petId, 'petId')

        const user = data.findUserById(userId)
        if (!user) throw new ExistenceError('user not found')

        const pet = data.findPetById(petId)
        if (!pet) throw new ExistenceError('pet not found')

        if (pet.userId !== userId) throw new OwnershipError('user not owner of pet')

        data.deletePet(petId)
    }

    getPet(userId, petId) {
        validate.id(userId, 'userId')
        validate.id(petId, 'petId')

        const user = data.findUserById(userId)
        if (!user) throw new ExistenceError('user not found')

        const pet = data.findPetById(petId)
        if (!pet) throw new ExistenceError('pet not found')

        if (pet.userId !== userId) throw new OwnershipError('user not owner of pet')

        return pet
    }

    modifyPet(userId, petId, name, birthdate, weight, image) {
        validate.id(userId, 'userId')
		validate.id(petId, 'petId')
        validate.name(name)
        validate.date(birthdate, 'birthdate')
        validate.number(weight, 'weight')
        validate.url(image, 'image')

        const user = data.findUserById(userId)
        if (user === null) throw new ExistenceError('user not found')

        const pet = data.findPetById(petId)
        if (!pet) throw new ExistenceError('pet not found')

        data.updatePet(new Pet(petId, userId, name, birthdate, weight, image))
    }
}

// instance

export const logic = new Logic()


