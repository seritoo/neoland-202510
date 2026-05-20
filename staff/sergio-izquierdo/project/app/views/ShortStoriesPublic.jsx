import { useState, useEffect } from 'react'

import { Layout } from './components/commons/Layout'
import { Header } from './components/commons/Header'
import { Paragraph } from './components/commons/Paragraph'
import { LandingButton } from './components/commons/lucide/LandinButton'
import { StoryDetailButton } from './components/commons/lucide/StoryDetailButton'

import { logic } from '../logic'
import { useContext } from '../context'

import { logger } from '../logger'

export function ShortStoriesPublic({ onGoToShortStoryView, onGoToLanding }) {
	logger.debug('Short Stories Public -> call')

	const { onError } = useContext()
	const [shortStories, setShortStories] = useState([])

	useEffect(() => {
		try {
			logic.getAllPublicStories()
				.then(shortStories => setShortStories(shortStories))
				.catch(error => onError(error))
		} catch (error) {
			onError(error)
		}
	}, [])

	const handleShortStoryDetailButtonClick = storyId => onGoToShortStoryView(storyId)

	logger.debug('Short Stories Public -> render')

	return <Layout className="h-screen overflow-hidden flex flex-col items-stretch">
		<div className='sticky top-0 z-50 w-full bg-[#E5D6D6] shrink-0 shadow-md'>
			<Header title='Short Stories' className='pb-5'>
			</Header>
		</div>
		<main className="flex-1 overflow-y-auto p-6 bg-[#E5D6D6]">
			<Paragraph> Enjoy the latest stories from our Storytellers...</Paragraph>
			<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mt-5 pb-10">

				{shortStories.map(story => (
					<article
						key={story.id}
						className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 flex flex-col h-72"
					>
						<div className="mb-4">
							<h2 className="font-['Inknut_Antiqua'] text-[#3F295F] text-xl mb-1 leading-tight">
								{story.title}
							</h2>

							<p className="text-[10px] uppercase tracking-wider text-[#3F295F] opacity-60 font-bold">
								{story.author?.username || 'Unknown'}
							</p>
						</div>

						<p className="text-sm leading-relaxed text-[#3F295F] text-justify opacity-90 line-clamp-5 flex-1">
							{story.shortStory}
						</p>

						<div className="mt-4 pt-4 border-t border-[#E5D6D6] flex justify-between items-center">
							<span className="text-[10px] text-[#3F295F] opacity-50">
								{new Date(story.storyDate).toLocaleDateString()}
							</span>

							<StoryDetailButton onClick={() => handleShortStoryDetailButtonClick(story.id)} />
						</div>
					</article>
				))}
			</section>
		</main>
		<div className="fixed bottom-5 left-5 z-50">
			<LandingButton onClick={onGoToLanding} />
		</div>
	</Layout>
}
