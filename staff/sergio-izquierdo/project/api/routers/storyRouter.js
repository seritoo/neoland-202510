import { Router } from 'express'
import jwt from 'jsonwebtoken'

import { authMiddleware, hibridAuthMiddleware } from '../middlewares/index.js'
import {
	createStoryHandler,
	getAllStoriesHandler,
	modifyShortStoryHandler,
	removeShortStoryHandler,
	getMyStoriesHandler,
	getMyStoryHandler
} from './handlers/index.js'



export const storyRouter = new Router()

storyRouter.post('', authMiddleware, createStoryHandler)
storyRouter.get('', authMiddleware, getMyStoriesHandler)
storyRouter.get('/:storyId', authMiddleware, getMyStoryHandler)
storyRouter.patch('/:storyId', authMiddleware, modifyShortStoryHandler)
storyRouter.delete('/:storyId', authMiddleware, removeShortStoryHandler)
storyRouter.get('/stories', hibridAuthMiddleware, getAllStoriesHandler)
