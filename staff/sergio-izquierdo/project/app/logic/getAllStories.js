import { data } from '../data'

import { SystemError, errorMap } from 'com'

export function getAllStories() {
	const headers = {}
	const token = data.getToken()

	if (token) {
		headers.Authorization = `Bearer ${token}`
	}
	return fetch(`${import.meta.env.VITE_API_URL}/stories`, {
		method: 'GET',
		headers: headers
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
