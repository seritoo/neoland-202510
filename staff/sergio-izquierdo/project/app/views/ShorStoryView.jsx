import { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import { Layout } from './components/commons/Layout'
import { Header } from './components/commons/Header'
import { BackButton } from './components/commons/lucide/BackButton'
import { Avatar } from './components/commons/Avatar'
import { Spinner} from './components/Spinner'


import { logger } from '../logger'
import { AvatarProfile } from './components/commons/AvatarProfile'

import { logic } from '../logic'
import { useContext } from '../context'

export function ShortStoryView({ onGoToShortStories }) {
	logger.debug('Short story view -> call')

	const { storyId } = useParams()

	const [story, setStory] = useState(null)

	const { onError } = useContext()

	useEffect(() => {
		logger.debug('Short story view -> useEffect')

		try {
			logic.getShortStory(storyId)
				.then(story => {
					setStory(story)})
				.catch(error => {
					onError(error)})
		} catch (error) {
			onError(error)
		}
	}, [storyId])

	logger.debug('Short story view -> render')

	if (!story) { return <Spinner/>}
		return <Layout className="h-screen overflow-hidden flex flex-col items-stretch" >
			<div className='sticky top-0 z-50 w-full bg-[#E5D6D6] shrink-0 shadow-md pb-6'>
				<Header title='Short Story' />
			</div>
			<main className="flex-1 overflow-y-auto p-6 bg-[#E5D6D6] flex flex-col items-center">

				<section className="mt-4 mb-5">
					<AvatarProfile
						image={story.author.image}
						name={story.author.name}
						speciality='Creator in AppasionArte'
					/>
				</section>
				<p className="font-['Inknut_Antiqua'] italic text-[#3F295F] text-sm opacity-80 text-center max-w-xs px-4 mb-5 leading-relaxed">
					{story.author.description}
				</p>
				<article className="w-full  bg-white p-8 rounded-3xl shadow-sm border border-[#E94E77]">
					<div className="mb-8 border-b border-[#E5D6D6] pb-4">
						<h1 className="font-['Inknut_Antiqua'] text-[#3F295F] text-2xl mb-1">
							{story.title}
						</h1>
						<p className="text-[10px] uppercase tracking-wider text-[#3F295F] opacity-50 font-bold">
							 {new Date(story.storyDate).toLocaleDateString()}
						</p>
					</div>
					<p className="text-base leading-relaxed text-[#3F295F] whitespace-pre-line">
						{story.shortStory}
					</p>
				</article>

			</main>
			<div className="fixed bottom-5 left-5 z-50">
				<BackButton onClick={onGoToShortStories} />
			</div>
		</Layout>
}
