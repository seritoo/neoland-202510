import { SystemError } from 'com'
import { StoryModel } from '../mongoose/index.js'

export function deleteAllShortStories() {
    return StoryModel.deleteMany()
    .catch(error => { throw new SystemError(error.message) })
    .then(result =>  { })
}
