import { data } from '../data'

import { validate, AuthError, SystemError, errorMap } from 'com'

export function modifyUserDescription(description) {
	if (data.getToken() === null) throw new AuthError('user not logged in')

	validate.text(description, 'description')

	return fetch(`${import.meta.env.VITE_API_URL}/users/description`, {
		method: 'PATCH',
		headers: {
			'Authorization': `Bearer ${data.getToken()}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ description })
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
