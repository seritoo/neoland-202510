import { data } from '../data'

export function isUserLoggedIn() {
	return !!data.getToken() //doble negación convierte a booleano algo que no lo es
}
