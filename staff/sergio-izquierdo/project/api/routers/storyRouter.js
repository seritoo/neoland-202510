import { Router } from 'express'
import jwt from 'jsonwebtoken'

import { authMiddleware, hybridAuthMiddleware } from '../middlewares/index.js'
import {
	createStoryHandler,
	getAllStoriesHandler,
	modifyShortStoryHandler,
	removeShortStoryHandler,
	getMyStoriesHandler,
	getMyStoryHandler,
	getShortStoryHandler

} from './handlers/index.js'



export const storyRouter = new Router()
//privadas
storyRouter.post('/mine', authMiddleware, createStoryHandler)

storyRouter.get('/mine', authMiddleware, getMyStoriesHandler)
storyRouter.get('/mine/:storyId', authMiddleware, getMyStoryHandler)
storyRouter.patch('/mine/:storyId', authMiddleware, modifyShortStoryHandler)
storyRouter.delete('/mine/:storyId', authMiddleware, removeShortStoryHandler)


// publicas
storyRouter.get('/', hybridAuthMiddleware, getAllStoriesHandler)
storyRouter.get('/:storyId', getShortStoryHandler)
