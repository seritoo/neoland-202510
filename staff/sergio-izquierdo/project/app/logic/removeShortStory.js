import { data } from '../data'

import { validate, AuthError, SystemError, errorMap } from 'com'

export function removeShortStory(storyId) {
	if (data.getToken() === null) throw new AuthError('user not logged in')

	validate.id(storyId, 'storyId')

	return fetch(`${import.meta.env.VITE_API_URL}/stories/${storyId}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${data.getToken()}`
		}
	})
		.catch(error => { throw new SystemError('connection error') })
		.then(res => {
			const { status } = res

			if (status === 204) return

			return res.json()
				.then(body => {
					const { error, message } = body
					const constructor = errorMap[error]
					throw new constructor(message)
				})
		})
}
