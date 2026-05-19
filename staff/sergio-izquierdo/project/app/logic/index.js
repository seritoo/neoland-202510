import { registerUser } from './registerUser'
import { loginUser } from './loginUser'
import { isUserLoggedIn } from './isUserLoggedIn'
import { logoutUser } from './logoutUser'
import { getLoggedInUser } from './getLoggedInUser'
import { createStory } from './createStory'
import { getMyStories } from './getMyStories'
import { modifyUserDescription } from './modifyUserDescription'
import { getMyStory } from './getMyStory'
import { modifyShortStory } from './modifyShortStory'
import { removeShortStory } from './removeShortStory'
import { getAllStories } from './getAllStories'
import { getShortStory} from './getShortStory'
import { getAllPublicStories} from './getAllPublicStories'


export const logic = {
	registerUser,
	loginUser,
	isUserLoggedIn,
	logoutUser,
	getLoggedInUser,
	createStory,
	getMyStories,
	modifyUserDescription,
	getMyStory,
	modifyShortStory,
	removeShortStory,
	getAllStories,
	getShortStory,
	getAllPublicStories
}
