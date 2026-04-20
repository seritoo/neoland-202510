import { registerUser } from './registerUser'
import { loginUser} from './loginUser'
import { isUserLoggedIn } from './isUserLoggedIn'
import { logout } from './logout'
import { getLoggedInUser } from './getLoggedInUser'


export const logic = {
	registerUser,
	loginUser,
	isUserLoggedIn,
	logout,
	getLoggedInUser
}
