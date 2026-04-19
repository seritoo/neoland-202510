import {createRoot} from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router'

import { App } from './App.jsx'
import './index.css'



const root = createRoot(document.getElementById('root'))

root.render(<Router>
	<App />
</Router>)
