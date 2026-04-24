import { Router } from 'express'
import jwt from 'jsonwebtoken'

import { authMiddleware } from '../middlewares/index.js'

import {
	authenticateUserHandler,
	registerUserHandler,
	getUserHandler,
	createStoryHandler,
	modifyUserDescriptionHandler
} from "./handlers/index.js"


export const userRouter = new Router()

userRouter.post('', registerUserHandler)
userRouter.post('/auth', authenticateUserHandler)
userRouter.get('/me', authMiddleware, getUserHandler)
userRouter.patch('/description', authMiddleware, modifyUserDescriptionHandler)
