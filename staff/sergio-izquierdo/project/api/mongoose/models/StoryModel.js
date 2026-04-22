import { model } from 'mongoose'
import { storySchema } from '../schemas/index.js'

export const StoryModel = model('Story', storySchema)
