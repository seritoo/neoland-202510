import { validate } from "com";
import { data } from "../data";
import { Story } from "./models";


export function getAllStories(userId = null) {

	if(userId !== null)
	validate.id(userId, 'userId')

	return data.findAllStories()
		.then(storiesData => {
			return storiesData.map(storyData => {
				const { id, author, title, shortStory, storyDate} = storyData

				const isOwner = (userId.toString() === storyData.author.id.toString())

				return new Story(id, author, title, shortStory, storyDate, isOwner)
			})
		})
}
