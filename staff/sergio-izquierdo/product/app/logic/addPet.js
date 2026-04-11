import { data } from '../data'

import { validate, SystemError, AuthError, errorMap } from 'com'

export function addPet(name, birthdate, weight, image) {
	if (data.getToken() === null) throw new AuthError('user not logged in') // solo validamos que el usuario este loguineado

	validate.name(name)
	validate.date(birthdate, 'birthdate')
	validate.number(weight, 'weight')
	validate.url(image, 'image')

	return fetch(`${import.meta.env.VITE_API_URL}/pets`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${data.getToken()}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ name, birthdate, weight, image })
	})
		.catch(error => { throw new SystemError('connection error') })
		.then(res => {
			const { status } = res

			if (status === 201)
				return

			return res.json()
				.then(body => {

					const { error, message } = body

					const constructor = errorMap[error]

					throw new constructor(message)
				})
		})
}
