import mongoose from 'mongoose'
import { userSchema} from './userSchema.js'
import { petSchema} from './petSchema.js'

const { model } = mongoose

export const UserModel = model('User', userSchema)
export const PetModel = model('Pet', petSchema)
export const database = mongoose
