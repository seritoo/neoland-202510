import { Router } from 'express'
import jwt from 'jsonwebtoken'

import { authMiddleware } from '../middlewares/index.js'
import { createStoryHandler, modifyShortStoryHandler } from './handlers/index.js'
import { getMyStoriesHandler } from './handlers/getMyStoriesHandler.js'
import { getMyStoryHandler } from './handlers/getMyStoryHandler.js'


export const storyRouter = new Router()

storyRouter.post('', authMiddleware, createStoryHandler)
storyRouter.get('', authMiddleware, getMyStoriesHandler)
storyRouter.get('/:storyId', authMiddleware, getMyStoryHandler)
storyRouter.patch('/:storyId', authMiddleware, modifyShortStoryHandler)
