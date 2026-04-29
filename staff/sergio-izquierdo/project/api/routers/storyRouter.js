import { Router } from 'express'
import jwt from 'jsonwebtoken'

import { authMiddleware, hybridAuthMiddleware } from '../middlewares/index.js'
import {
	createStoryHandler,
	getAllStoriesHandler,
	modifyShortStoryHandler,
	removeShortStoryHandler,
	getMyStoriesHandler,
	getMyStoryHandler
} from './handlers/index.js'



export const storyRouter = new Router()
//privadas
storyRouter.post('', authMiddleware, createStoryHandler)
storyRouter.get('/mine', authMiddleware, getMyStoriesHandler)
storyRouter.get('/:storyId', authMiddleware, getMyStoryHandler)
storyRouter.patch('/edit-story/:storyId', authMiddleware, modifyShortStoryHandler)
storyRouter.delete('/:storyId', authMiddleware, removeShortStoryHandler)


// publicas
storyRouter.get('/', hybridAuthMiddleware, getAllStoriesHandler)
