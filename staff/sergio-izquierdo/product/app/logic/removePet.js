import { data } from '../data'

import { validate, SystemError, AuthError, errorMap } from 'com'

export function removePet(petId) {
	if (data.getToken() === null) throw new AuthError('user not logged in')

	validate.id(petId, 'petId')

	return fetch(`${import.meta.env.VITE_API_URL}/pets/${petId}`, { // construimos la la ruta con el petId
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${data.getToken()}`
		}
	})
		.catch(error => { throw new SystemError('connection error') })
		.then(res => {
			const { status } = res

			if (status === 204)
				return

			return res.json()
				.then(body => {

					const { error, message } = body

					const constructor = errorMap[error]

					throw new constructor(message)
				})
		})
}
