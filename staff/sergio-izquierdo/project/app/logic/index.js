import { registerUser } from './registerUser'
import { loginUser } from './loginUser'
import { isUserLoggedIn } from './isUserLoggedIn'
import { logoutUser } from './logoutUser'
import { getLoggedInUser } from './getLoggedInUser'
import { createStory } from './createStory'
import { getMyStories } from './getMyStories'


export const logic = {
	registerUser,
	loginUser,
	isUserLoggedIn,
	logoutUser,
	getLoggedInUser,
	createStory,
	getMyStories
}
