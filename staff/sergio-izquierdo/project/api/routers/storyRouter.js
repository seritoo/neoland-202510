import { Router } from 'express'
import jwt from 'jsonwebtoken'

import { authMiddleware } from '../middlewares/index.js'
import { createStoryHandler } from './handlers/index.js'
import { getMyStoriesHandler } from './handlers/getMyStoriesHandler.js'




export const storyRouter = new Router()

storyRouter.post('', authMiddleware, createStoryHandler)
storyRouter.get('', authMiddleware, getMyStoriesHandler)
