export * from './models/index.js'

import { findUserByEmail } from './findUserByEmail.js'
import { findUserByUsername} from './findUserByUsername.js'
import { insertUser} from './insertUser.js'
import { findUserById } from './findUserById.js'
import { insertStory } from './insertStory.js'
import { findStoriesByOwnerId } from './findStoriesByOwnerId.js'
import { updateUserDescription } from './updateUserDescription.js'
import { findStoryById } from './findStoryById.js'
import { updateShortStory } from './updateShortStory.js'
import { deleteShortStory } from './deleteShortStory.js'
import { findAllStories} from './findAllStories.js'
import { deleteAllUsers } from './deleteAllUsers.js'
import { deleteAllShortStories} from './deleteAllShortStories.js'
import { updateUser } from './updateUser.js'

export const data = {
	findUserByEmail,
	findUserByUsername,
	insertUser,
	findUserById,
	insertStory,
	findStoriesByOwnerId,
	updateUserDescription,
	findStoryById,
	updateShortStory,
	deleteShortStory,
	findAllStories,
	deleteAllUsers,
	deleteAllShortStories,
	updateUser
}

