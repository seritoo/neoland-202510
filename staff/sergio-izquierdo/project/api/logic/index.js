export * from './models/index.js'

import { registerUser } from './registerUser.js'
import { authenticateUser } from './authenticateUser.js'
import { getUser} from './getUser.js'
import { createStory } from './createStory.js'
import { getMyStories } from './getMyStories.js'
import { modifyUserDescription } from './modifyUserDescription.js'
import { getMyStory } from './getMyStory.js'
import { modifyShortStory } from './modifyShortStory.js'
import { removeShortStory } from './removeShortStory.js'
import { getAllStories } from './getAllStories.js'
import { getShortStory } from './getShortStory.js'
import { getAllPublicStories } from './getAllPublicStories.js'
import { modifyUserImage } from './modifyUserImage.js'


export const logic = {
	registerUser,
	authenticateUser,
	getUser,
	createStory,
	getMyStories,
	modifyUserDescription,
	getMyStory,
	modifyShortStory,
	removeShortStory,
	getAllStories,
	getShortStory,
	getAllPublicStories,
	modifyUserImage
}
