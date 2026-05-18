import { Router } from 'express'
import jwt from 'jsonwebtoken'

import { authMiddleware } from '../middlewares/index.js'
import {
	createStoryHandler,
	getAllStoriesHandler,
	modifyShortStoryHandler,
	removeShortStoryHandler,
	getMyStoriesHandler,
	getMyStoryHandler,
	getShortStoryHandler,
	getAllPublicStoriesHandler

} from './handlers/index.js'



export const storyRouter = new Router()
//privadas
storyRouter.post('/mine', authMiddleware, createStoryHandler)

storyRouter.get('/mine', authMiddleware, getMyStoriesHandler)
storyRouter.get('/mine/:storyId', authMiddleware, getMyStoryHandler)
storyRouter.patch('/mine/:storyId', authMiddleware, modifyShortStoryHandler)
storyRouter.delete('/mine/:storyId', authMiddleware, removeShortStoryHandler)
storyRouter.get('/private', authMiddleware, getAllStoriesHandler)

// publicas
storyRouter.get('/public', getAllPublicStoriesHandler)
storyRouter.get('/:storyId', getShortStoryHandler)
