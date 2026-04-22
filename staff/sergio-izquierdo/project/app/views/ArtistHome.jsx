import { useState, useEffect} from 'react'

import { Layout } from './components/commons/Layout'
import { Header } from './components/commons/Header'
import { Button } from './components/commons/Button'
import { ArtButton } from './components/ArtButton'
import { Footer } from './components/commons/Footer'
import { Anchor } from './components/commons/Anchor'

import { useContext } from '../context'

import { logic } from '../logic'

import { logger } from '../logger'





export function ArtistHome({ onUserLoggedOut, onGoToProfile, onGoToAddArt, onGoToShortStories }) {
	logger.debug('ArtistHome -> call')

	const { onError } = useContext()

	const [image, setImage] = useState(null)
	const [stories, setStories] = useState([])

	useEffect(() => {
		logger.debug('ArtistHome -> useEffect')
		try {
			logic.getLoggedInUser()
				.then(user => {
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

	const handleShortStoriesClick = event => {
		event.preventDefault

		onGoToShortStories()
	}

	return <Layout>
		<Header title='Hi, Artist!'>
			<div>
				<img className='rounded-full border border-[#3F295F] w-20 h-20 object-cover mt-2 ' src={image} />
			</div>
		</Header>

		<main className='flex flex-col items-center mt-5 w-full gap-5'>
			<nav className='flex gap-4'>
				<Button className="w-36 py-2" onClick={handleAddArtClick} >+ Art</Button>

				<Button className="w-36 py-2" onClick={handleProfileClick}>Profile</Button>
			</nav>

			<div className="w-full flex justify-center">
				<ArtButton onClick={handleShortStoriesClick}>
					Short Stories
				</ArtButton>
			</div>

			<section className='w-full flex flex-col gap-4 px-4'>
				{stories.length === 0 ? ( <p className='text-center'>No stories yet...</p>
				 ) : (
					stories.map(story => ( <article key={story.id} className='bg-white p-4 rounded shadow flex flex-col gap-2'>
						<h2 className='font-bold'>{story.title}</h2>
						<p className='text-sm line-clamp-3'>{story.shortStory}</p>
						<button className='self-end text-purple-600'>Read more</button>
					</article>
					 ))
				 )}
			</section>
		</main>

		<Footer>
			<button className="bg-violet-400 p-2 rounded-[10%] text-['inknut antiqua'] text-[#3F295F]" onClick={handleLogoutClick}>Logout</button>
		</Footer>
	</Layout>
}
