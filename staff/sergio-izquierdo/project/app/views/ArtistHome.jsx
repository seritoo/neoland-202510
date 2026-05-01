import { useState, useEffect } from 'react'

import { Layout } from './components/commons/Layout'
import { Header } from './components/commons/Header'
import { Button } from './components/commons/Button'
import { ArtButton } from './components/ArtButton'
import { AddArtButton } from './components/commons/lucide/AddArtButton'
import { ProfileButton } from './components/commons/lucide/ProfileButton'
import { LogoutButton } from './components/commons/lucide/LogoutButton'
import { StoryDetailButton } from './components/commons/lucide/StoryDetailButton'
import { LandingButton } from './components/commons/lucide/LandinButton'
import { Footer } from './components/commons/Footer'
import { Anchor } from './components/commons/Anchor'
import { AvatarSalute } from './components/commons/AvatarSalute'
import { BarraNav } from './components/commons/BarraNav'

import { useContext } from '../context'

import { logic } from '../logic'

import { logger } from '../logger'





export function ArtistHome({ onUserLoggedOut, onGoToProfile, onGoToAddArt, onGoToLanding, onGoToShortStoryDetail }) {
	logger.debug('ArtistHome -> call')

	const { onError } = useContext()

	const [stories, setStories] = useState([])
	const [username, setUsername] = useState(null)
	const [image, setImage] = useState(null)

	useEffect(() => {
		logger.debug('ArtistHome -> useEffect')
		try {
			logic.getLoggedInUser()
				.then(user => {
					setUsername(user.username)
					setImage(user.image || image)
				})
				.catch(error => onError(error))
		} catch (error) {
			onError(error)
		}
	}, [])

	useEffect(() => {
		try {
			logic.getMyStories()
				.then(setStories)
				.catch(onError)
		} catch (error) {
			onError(error)
		}

	}, [])

	const handleAddArtClick = event => {
		event.preventDefault()

		onGoToAddArt()
	}

	const handleProfileClick = event => {
		event.preventDefault()

		onGoToProfile()
	}

	const handleLogoutClick = event => {
		event.preventDefault()

		try {
			logic.logoutUser()

			onUserLoggedOut()
		} catch (error) {
			onError(error)
		}
	}

	const handleLandingClick = event => {
		event.preventDefault()

		onGoToLanding()
	}

	const handleShortStoryDetailClick = (storyId) => onGoToShortStoryDetail(storyId)


	return <Layout className="h-screen overflow-hidden flex flex-col">

		<div className='sticky top-0 z-50 w-full bg-[#E5D6D6] shadow-sm'>
			<Header title='Artist Home'>
				<BarraNav>
					<LandingButton onClick={handleLandingClick} />
					<AddArtButton onClick={handleAddArtClick} />
					<ProfileButton onClick={handleProfileClick} />
					<LogoutButton onClick={handleLogoutClick} />
				</BarraNav>
			</Header>

			<AvatarSalute username={username} image={image} />

		</div>


		<main className='flex-1 overflow-y-auto w-full'>

			<section className='w-full flex flex-col gap-4 px-4 mt-6 pb-10'>
				{stories.length === 0 ? (<p className='text-center'>No stories yet...</p>
				) : (
					stories.map(story => (<article key={story.id} className='bg-white p-4 rounded shadow flex flex-col gap-2 overflow-hidden'>
						<h2 className='font-bold wrap-break-word'>{story.title}</h2>
						<p className='text-sm wrap-break-word line-clamp-3'>{story.shortStory}</p>

						<div className="flex justify-between items-center mt-2">
							<time className='text-[10px] block mt-2 text-gray-500'>{new Date(story.storyDate).toLocaleDateString()}</time>
							<StoryDetailButton onClick={() => handleShortStoryDetailClick(story.id)} />
						</div>
					</article>
					))
				)}
			</section>
		</main>
	</Layout>
}
