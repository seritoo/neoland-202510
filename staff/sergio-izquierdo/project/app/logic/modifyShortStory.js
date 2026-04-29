import  {data} from '../data'

import { validate, AuthError, SystemError, errorMap } from 'com'

export function modifyShortStory(storyId, title, shortStory) {
	if (data.getToken() === null) throw new AuthError('user not logged in')

	validate.id(storyId, 'storyId')
	validate.text(title, 'title')
	validate.text(shortStory, 'shortStory')

	return fetch(`${import.meta.env.VITE_API_URL}/edit-story/${storyId}`, {
		method: 'PATCH',
		headers: {
			Authorization: `Bearer ${data.getToken()}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ title, shortStory })
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
