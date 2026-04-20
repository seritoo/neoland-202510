import { data } from '../data'

export function logout() {
	return data.removeToken()
}
