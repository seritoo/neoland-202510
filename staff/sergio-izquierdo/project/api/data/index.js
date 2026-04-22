export * from './models/index.js'

import { findUserByEmail } from './findUserByEmail.js'
import { findUserByUsername} from './findUserByUsername.js'
import { insertUser} from './insertUser.js'
import { findUserById } from './findUserById.js'
import { insertStory } from './insertStory.js'
import { findStoriesByOwnerId } from './findStoriesByOwnerId.js'

export const data = {
	findUserByEmail,
	findUserByUsername,
	insertUser,
	findUserById,
	insertStory,
	findStoriesByOwnerId
}

