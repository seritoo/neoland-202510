import { data } from '../data'

import { AuthError, SystemError, errorMap } from 'com'

export function getAllStories() {
	if(!data.getToken()) throw new AuthError('user not logged in')

	return fetch(`${import.meta.env.VITE_API_URL}/stories/private`, {
		method: 'GET',
		headers: {
			Authorization:  `Bearer ${data.getToken()}`
		}
	})
		.catch(error => { throw new SystemError('connection error') })
		.then(res => {
			const { status } = res

			if (status === 200)
				return res.json()
					.catch(error => { throw new SystemError('json error') })
					.then(stories => stories)

			return res.json()
				.then(body => {

					const { error, message } = body

					const constructor = errorMap[error]

					throw new constructor(message)
				})
		})
}
