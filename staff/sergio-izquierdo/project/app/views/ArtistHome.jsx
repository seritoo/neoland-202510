import { useState, useEffect } from 'react'

import { Layout } from './components/commons/Layout'
import { Header } from './components/commons/Header'
import { Button } from './components/commons/Button'
import { ArtButton } from './components/ArtButton'
import { AddArtButton } from './components/lucide/AddArtButton'
import { ProfileButton } from './components/lucide/ProfileButton'
import { LogoutButton } from './components/lucide/LogoutButton'
import { StoryDetailButton } from './components/lucide/StoryDetailButton'
import { LandingButton } from './components/lucide/LandinButton'
import { Footer } from './components/commons/Footer'
import { Anchor } from './components/commons/Anchor'

import { useContext } from '../context'

import { logic } from '../logic'

import { logger } from '../logger'





export function ArtistHome({ onUserLoggedOut, onGoToProfile, onGoToAddArt, onGoToShortStories, onGoToLanding }) {
	logger.debug('ArtistHome -> call')

	const { onError } = useContext()

	const [stories, setStories] = useState([])
	const [username, setUsername] = useState(null)
	const [image, setImage] = useState('https://imgs.search.brave.com/OaxMCLDxZ_2g_boMXm52qKq51mlF4w5QwOl6HIHuHYM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2VzLmgtY2Ru/LmNvL2ZvdG9lcy9p/bWFnZXMvbm90aWNp/YXMtY2luZS9wb3It/cXVlLXN0ZXBoZW4t/a2luZy15LXN0ZXZl/bi1zcGllbGJlcmct/bm8tdHJhYmFqYXJv/bi1qdW50b3MtZW4t/cG9sdGVyZ2Vpc3Qv/MTM3OTgwMzY0LTEt/ZXNsLUVTL0xhLWlu/Y3JlaWJsZS1yYXpv/bi1wb3ItbGEtcXVl/LVN0ZXZlbi1TcGll/bGJlcmcteS1TdGVw/aGVuLUtpbmctbm8t/dHJhYmFqYXJvbi1q/dW50b3MtZW4tUG9s/dGVyZ2Vpc3QuanBn/P2Nyb3A9MS4wMHh3/OjAuNjQ2eGg7MCww/LjAyNjl4aCZyZXNp/emU9NjQwOio')

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
		event.preventDefault

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

	return <Layout className="h-screen overflow-hidden flex flex-col">

		<div className='sticky top-0 z-50 w-full bg-[#E5D6D6] shadow-sm'>
			<Header title='Artist Home'>
				<nav className='flex justify-between w-full nav-gradient-artist h-10 px-10 mt-5'>
					<LandingButton onClick={handleLandingClick} />
					<AddArtButton onClick={handleAddArtClick} />
					<ProfileButton onClick={handleProfileClick} />
					<LogoutButton onClick={handleLogoutClick} />
				</nav>
			</Header>
			<div className="flex justify-start items-center w-full gap-3 p-3 bg-[#E5D6D6]">
				<img
					className="rounded-full w-12 h-12 object-cover border border-[#3F295F]"
					src={image}
					alt="Avatar" />
				<h2 className="font-['Inknut_Antiqua'] text-[#3F295F] text-xl">
					Hola, {username || 'Artist'}!
				</h2>
			</div>

		</div>


		<main className='flex-1 overflow-y-auto w-full'>

			<section className='w-full flex flex-col gap-4 px-4 mt-6 pb-10'>
				{stories.length === 0 ? (<p className='text-center'>No stories yet...</p>
				) : (
					stories.map(story => (<article key={story.id} className='bg-white p-4 rounded shadow flex flex-col gap-2 overflow-hidden'>
						<h2 className='font-bold wrap-break-word'>{story.title}</h2>
						<p className='text-sm wrap-break-word line-clamp-3'>{story.shortStory}
							<time className='text-[10px] block mt-2 text-gray-500'>
								{new Date(story.storyDate).toLocaleDateString()}
							</time></p>

						<StoryDetailButton />
					</article>
					))
				)}
			</section>
		</main>
	</Layout>
}
