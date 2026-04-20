export * from './models/index.js'

import { findUserByEmail } from './findUserByEmail.js'
import { findUserByUsername} from './findUserByUsername.js'
import { insertUser} from './insertUser.js'
import { findUserbyId } from './findUserById.js'

export const data = {
	findUserByEmail,
	findUserByUsername,
	insertUser,
	findUserbyId
}
