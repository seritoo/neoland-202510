import { data } from './data'

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const URL_REGEX = /(www|http:|https:)+[^\s]+[\w]/
const ISODATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
const PET_ID_REGEX = /^\pet-[0-9]+$/

class Logic {
    constructor() {
    }

    registerUser(name, email, username, password, passwordRepeat) {
        if (typeof name !== 'string') throw new Error('invalid name type')
        if (name.length < 1) throw new Error('invalid name length')

        if (typeof email !== 'string') throw new Error('invalid email type')
        if (email.length < 6) throw new Error('invalid email length')
        if (!EMAIL_REGEX.test(email)) throw new Error('invalid email format')

        if (typeof username !== 'string') throw new Error('invalid username type')
        if (username.length < 3) throw new Error('invalid username length')

        if (typeof password !== 'string') throw new Error('invalid password type')
        if (password.length < 8) throw new Error('invalid password length')

        if (typeof passwordRepeat !== 'string') throw new Error('invalid passwordRepeat type')
        if (passwordRepeat.length < 8) throw new Error('invalid passwordRepeat length')

        if (password !== passwordRepeat) throw new Error('passwords do not match')

        return fetch('http://localhost:8080/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, username, password, passwordRepeat })
        })
            .then(res => {

                const { status } = res

                if (status === 201)
                    return

                return res.json()
                    .then(body => {

                        const { error, message } = body

                        throw new Error(message)

                    })
            })
    }

    loginUser(username, password) {
        if (typeof username !== 'string') throw new Error('invalid username type')
        if (username.length < 3) throw new Error('invalid username length')

        if (typeof password !== 'string') throw new Error('invalid password type')
        if (password.length < 8) throw new Error('invalid password length')

        return fetch('http://localhost:8080/users/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(res => {

                const { status } = res

                if (status === 200)
                    return res.json()
                        .then(userId => data.setLoggedInUserId(userId))

                return res.json()
                    .then(body => {

                        const { error, message } = body

                        throw new Error(message)

                    })
            })
    }

    logoutUser() {
        data.removeLoggedInUserId()
    }

    isUserLoggedIn() {
        return !!data.getLoggedInUserId() //doble negación convierte a booleano algo que no lo es
    }

    changeUserEmail(email, newEmail, newEmailRepeat) {
        if (data.getLoggedInUserId() === null) throw new Error('user not logged in')

        if (typeof email !== 'string') throw new Error('invalid e-mail type')
        if (email.length < 6) throw new Error('invalid e-mail length')
        if (!EMAIL_REGEX.test(email)) throw new Error('invalid e-mail format')

        if (typeof newEmail !== 'string') throw new Error('invalid new E-mail type')
        if (newEmail.length < 6) throw new Error('invalid new E-mail length')
        if (!EMAIL_REGEX.test(newEmail)) throw new Error('invalid e-mail format')

        if (typeof newEmailRepeat !== 'string') throw new Error('invalid e-mail type')
        if (newEmailRepeat.length < 6) throw new Error('invalid new E-mail repeat length')
        if (!EMAIL_REGEX.test(newEmailRepeat)) throw new Error('invalid new E-mail repeat format')

        if (newEmail !== newEmailRepeat) throw new Error('new E-mail and new E-mail repeat do not match 😥')

        return fetch('http://localhost:8080/users/me/email', {
            method: 'PATCH',
            headers: {
                Authorization: 'Basic ' + data.getLoggedInUserId(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, newEmail, newEmailRepeat })
        })
            .then(res => {

                const { status } = res // manejamos el status

                if (status === 204)
                    return

                return res.json()
                    .then(body => {

                        const { error, message } = body

                        throw new Error(message)
                    })
            })
    }

    changeUserPassword(password, newPassword, newPasswordRepeat) {
        if (data.getLoggedInUserId() === null) throw new Error('user not logged in')

        if (typeof password !== 'string') throw new Error('invalid password type')
        if (password.length < 8) throw new Error('invalid password length')

        if (typeof newPassword !== 'string') throw new Error('invalid new Password type')
        if (newPassword.length < 8) throw new Error('invalid new Password length')

        if (typeof newPasswordRepeat !== 'string') throw new Error('invalid new Passeord repeat type')
        if (newPasswordRepeat.length < 8) throw new Error('invalid new Password repeat length')

        if (newPassword !== newPasswordRepeat) throw new Error('new Password and new Password repeat do not match')

        return fetch('http://localhost:8080/users/me/password', {
            method: 'PATCH',
            headers: {
                Authorization: 'Basic ' + data.getLoggedInUserId(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password, newPassword, newPasswordRepeat })
        })
            .then(res => {

                const { status } = res

                if (status === 204)
                    return

                return res.json()
                    .then(body => {

                        const { error, message } = body

                        throw new Error(message)
                    })
            })
    }

    getLoggedInUser() {
        if (data.getLoggedInUserId() === null) throw new Error('user not logged in')

        return fetch('http://localhost:8080/users/me', {
            method: 'GET',
            headers: {
                Authorization: 'Basic ' + data.getLoggedInUserId() // enviamos el id del usuario conectado al sistema. Esto está en la capa de datos del front
            }
        })
            .then(res => {

                const { status } = res

                if (status === 200)
                    return res.json()
                //.then(user => user)

                return res.json()
                    .then(body => {

                        const { error, message } = body

                        throw new Error(message)
                    })
            })

    }

    changeUserImage(image) {
        if (data.getLoggedInUserId() === null) throw new Error('user not logged in')

        if (typeof image !== 'string') throw new Error('invalid image type')
        if (!URL_REGEX.test(image)) throw new Error('invalid image format')

        return fetch('http://localhost:8080/users/me/image', {
            method: 'PATCH',
            headers: {
                Authorization: 'Basic ' + data.getLoggedInUserId(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image })
        })
            .then(res => {

                const { status } = res // manejamos el status

                if (status === 204)
                    return

                return res.json()
                    .then(body => {

                        const { error, message } = body

                        throw new Error(message)
                    })
            })
    }



    addPet(name, birthdate, weight, image) {
        if (data.getLoggedInUserId() === null) throw new Error('user not logged in') // solo validamos que el usuario este loguineado

        if (typeof name !== 'string') throw new Error('invalid name type')
        if (name.length < 1) throw new Error('invalid name length')

        if (typeof birthdate !== 'string') throw new Error('invalid birthdate type')

        if (!ISODATE_REGEX.test(birthdate)) throw new Error('invalid birthdate format')

        if (typeof weight !== 'number' || isNaN(weight)) throw new Error('invalid weight type')

        if (typeof image !== 'string') throw new Error('invalid image type')

        if (!URL_REGEX.test(image)) throw new Error('invalid image format')

        return fetch('http://localhost:8080/pets', {
            method: 'POST',
            headers: {
                Authorization: 'Basic ' + data.getLoggedInUserId(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, birthdate, weight, image })
        })
            .then(res => {
                const { status } = res

                if (status === 201)
                    return

                return res.json()
                    .then(body => {

                        const { error, message } = body

                        throw new Error(message)
                    })
            })
    }

    getPets() {
        if (data.getLoggedInUserId() === null) throw new Error('user not logged in')

        return fetch('http://localhost:8080/pets', {
            method: 'GET',
            headers: {
                Authorization: 'Basic ' + data.getLoggedInUserId() // enviamos el id del usuario conectado al sistema. Esto está en la capa de datos del front
            }
        })
            .then(res => {
                const { status } = res

                if (status === 200)
                    return res.json()
                //.then(pets => pets)

                return res.json()
                    .then(body => {
                        const { error, message } = body

                        throw new Error(message)
                    })
            })
    }

    removePet(petId) {
        if (data.getLoggedInUserId() === null) throw new Error('user not logged in')

        if (typeof petId !== 'string') throw new Error('invalid pet-id type')

        if (!PET_ID_REGEX.test(petId)) throw new Error('invalid pet-id format')

        return fetch('http://localhost:8080/pets/' + petId, { // construimos la la ruta con el petId
            method: 'DELETE',
            headers: {
                Authorization: 'Basic ' + data.getLoggedInUserId()
            }
        })
            .then(res => {
                const { status } = res

                if (status === 204)
                    return

                return res.json()
                    .then(body => {
                        const { error, message } = body

                        throw new Error(message)
                    })
            })
    }

    getPet(petId) {
        if (data.getLoggedInUserId() === null) throw new Error('user not logged in')

        if (typeof petId !== 'string') throw new Error('invalid pet-id type')
        if (!PET_ID_REGEX.test(petId)) throw new Error('invalid pet-id format')

        return fetch('http://localhost:8080/pets/' + petId, { // construimos la la ruta con el petId
            //method: 'GET',  el método GET se puede omitir, el fetch lo reconocerá como tal
            headers: {
                Authorization: 'Basic ' + data.getLoggedInUserId()
            }
        })
            .then(res => {
                const { status } = res

                if (status === 200)
                    return res.json()
                //.then(pet => pet)

                return res.json()
                    .then(body => {

                        const { error, message } = body

                        throw new Error(message)
                    })
            })
    }

    modifyPet(petId, name, birthdate, weight, image) {
        if (data.getLoggedInUserId() === null) throw new Error('user not logged in') // solo validamos que el usuario este loguineado

        if (typeof petId !== 'string') throw new Error('invalid pet-id type')
        if (!PET_ID_REGEX.test(petId)) throw new Error('invalid pet-id format')

        if (typeof name !== 'string') throw new Error('invalid name type')
        if (name.length < 1) throw new Error('invalid name length')

        if (typeof birthdate !== 'string') throw new Error('invalid birthdate type')

        if (!ISODATE_REGEX.test(birthdate)) throw new Error('invalid birthdate format')

        if (typeof weight !== 'number' || isNaN(weight)) throw new Error('invalid weight type')

        if (typeof image !== 'string') throw new Error('invalid image type')

        if (!URL_REGEX.test(image)) throw new Error('invalid image format')

        return fetch('http://localhost:8080/pets/' + petId, {
            method: 'PUT',
            headers: {
                Authorization: 'Basic ' + data.getLoggedInUserId(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, birthdate, weight, image })
        })
            .then(res => {
                const { status } = res

                if (status === 204)
                    return

                return res.json()
                    .then(body => {
                        const { error, message } = body

                        throw new Error(message)
                    })
            })
    }
}


// instance

export const logic = new Logic()
