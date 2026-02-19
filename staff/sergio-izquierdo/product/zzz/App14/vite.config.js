import { defineConfig } from 'vite'  //importamos de la librería vite la función defineConfig
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()]
})
