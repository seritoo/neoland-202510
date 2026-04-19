import { Routes, Route } from 'react-router'

import { Landing } from './views/Landing'
import { Login } from './views/Login'


export function App() {
	return (
		<Routes>
			<Route path="/" element={<Landing />} />
			<Route path="/login" element={<Login />} />
		</Routes>
	)
}
