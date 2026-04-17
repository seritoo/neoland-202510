import { Router } from 'express'
import { authMiddleware } from '../middlewares/index.js'

import { authenticateUserHandler, registerUserHandler } from "./handlers/index.js"


export const userRouter = new Router()

userRouter.post('', registerUserHandler)
userRouter.post('/auth', authenticateUserHandler)
