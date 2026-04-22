import { SystemError } from 'com'
import { StoryModel } from '../mongoose/index.js'

export function insertStory(storyData) {
	return new StoryModel({
		owner: storyData.ownerId,
		title: storyData.title,
		shortStory: storyData.shortStory,
		storyDate: storyData.storyDate
	}).save()
}
