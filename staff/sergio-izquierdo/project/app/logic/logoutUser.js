import { data } from '../data'

export function logoutUser() {
	return data.removeToken()
}
