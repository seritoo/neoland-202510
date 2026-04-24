export * from './models/index.js'

import { registerUser } from './registerUser.js'
import { authenticateUser } from './authenticateUser.js'
import { getUser} from './getUser.js'
import { createStory } from './createStory.js'
import { getMyStories } from './getMyStories.js'
import { modifyUserDescription } from './modifyUserDescription.js'

export const logic = {
	registerUser,
	authenticateUser,
	getUser,
	createStory,
	getMyStories,
	modifyUserDescription
}
