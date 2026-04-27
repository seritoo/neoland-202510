import mongoose from 'mongoose'

const { Schema, ObjectId } = mongoose

export const storySchema = new Schema({
	owner: {
		type: ObjectId,
		ref: 'User',
		required: true
	},

	title: {
		type: String,
		minLength: 1,
		required: true
	},
	shortStory: {
		type: String,
		minLength: 1,
		maxLength: 5000,
		required: true
	},
	storyDate: {
		type: Date,
		required: true,
		default: Date.now
	}
})
