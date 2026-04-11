import { Router } from 'express'
import jwt from 'jsonwebtoken'

import { authMiddleware } from '../middlewares/authMiddleware.js'

import {
	resgisterUserHandler,
	authenticateUserHandler,
	changeUserEmailHandler,
	changeUserPasswordHandler,
	getUserHandler,
	changeUserImageHandler,
	changeUserNameHandler,
	changeUserUsernameHandler,
} from './handlers/index.js'

export const userRouter = new Router()

userRouter.post('', resgisterUserHandler)
userRouter.post('/auth', authenticateUserHandler )
userRouter.patch('/me/email', authMiddleware, changeUserEmailHandler)
userRouter.patch('/me/password', authMiddleware, changeUserPasswordHandler)
userRouter.get('/me', authMiddleware, getUserHandler)
userRouter.patch('/me/image', authMiddleware, changeUserImageHandler)
userRouter.patch('/me/name', authMiddleware, changeUserNameHandler)
userRouter.patch('/me/username', authMiddleware, changeUserUsernameHandler)
