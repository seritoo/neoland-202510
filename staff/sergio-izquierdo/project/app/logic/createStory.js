import { data } from '../data'

import { SystemError, AuthError, errorMap, validate } from 'com'


export function createStory(title, shortStory) {
	if (!data.getToken()) throw new AuthError('user not logged in')

	validate.text(title, 'title')
	validate.text(shortStory, 'shortStory')

	return fetch(`${import.meta.env.VITE_API_URL}/stories`, {
		method: 'POST',
		headers: {

			'Content-Type': 'application/json',
			Authorization: `Bearer ${data.getToken()}`
		},
		body: JSON.stringify({ title, shortStory })
	})
		.catch(error => { throw new SystemError('connection error') })
		.then(res => {
			const { status } = res

			if (status === 201)
				return

			return res.json()
				.catch(error => { throw new SystemError('json error') })
				.then(body => {
					const { error, message } = body

					const constructor = errorMap[error]

					throw new constructor(message)
				})
		})
}
