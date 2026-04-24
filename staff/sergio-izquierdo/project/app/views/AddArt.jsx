import { useState, useEffect } from 'react'

import { Layout } from './components/commons/Layout'
import { Header } from './components/commons/Header'
import { Form } from './components/commons/Form'
import { Field } from './components/commons/Field'
import { Label } from './components/commons/Label'
import { Button } from './components/commons/Button'
import { BackButton } from './components/lucide/BackButton'
import { ProfileButton } from './components/lucide/ProfileButton'
import { LandingButton } from './components/lucide/LandinButton'
import { LogoutButton } from './components/lucide/LogoutButton'

import { useContext } from '../context'

import { logic } from '../logic'

import { logger } from '../logger'

export function AddArt({ onGoToArtistHome, onGoToProfile, onGoToLanding }) {
	logger.debug('AddArt -> call')

	const [charCount, setCharCount] = useState(0)
	const MAX_CHARS = 5000
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

	const { onError, onSuccess } = useContext()

	const handleBackClick = event => {
		event.preventDefault()

		onGoToArtistHome()
	}

	const handleProfileClick = event => {
		event.preventDefault()

		onGoToProfile()
	}

	const handleLandingClick = event => {
		event.preventDefault()

		onGoToLanding()
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

	const handleShareArtSubmit = event => {
		event.preventDefault()

		const form = event.target

		const title = form.title.value
		const shortStory = form.shortStory.value

		try {
			logic.createStory(title, shortStory)
				.then(() => {
					onSuccess('Short story published successfully!')

					onGoToArtistHome()
				})
		} catch (error) {
			onError(error)

		}

	}

	const handleCharCountChange = event => setCharCount(event.target.value.length)

	return <Layout>
		<Header title='Share your art!'>
			<nav className='flex justify-between w-full nav-gradient-artist h-10 px-15 mt-5'>
				<LandingButton onClick={handleLandingClick} />
				<ProfileButton onClick={handleProfileClick} />
				<BackButton onClick={handleBackClick} />
				<LogoutButton onClick={handleLogoutClick} />
			</nav>
			<div className="flex justify-start items-center w-full gap-3 p-3 bg-[#E5D6D6]">
				<img
					className="rounded-full w-12 h-12 object-cover border border-[#3F295F]"
					src={image}
					alt="avatar" />
				<h2 className="font-['Inknut_Antiqua'] text-[#3F295F] text-xl">
					Hola, {username || 'Artist'}!
				</h2>
			</div>
		</Header>
		<main className='flex flex-col items-center w-full'>
				<Form onSubmit={handleShareArtSubmit} className='w-full'>
					<Field alias='title' type='text'>Title:</Field>

					<div className='flex flex-col w-full mt-2'>
						<Label className="font-['Inknut_Antiqua'] text-[#3F295F]">Short Story:</Label>
						<textarea
							name='shortStory'
							onChange={handleCharCountChange}
							maxLength={MAX_CHARS}
							className='w-full border border-black bg-white min-h-30 focus:outline-none focus:ring-2 focus:ring-[#E94E77] resize-none'
						/>
						<span className={`text-[10px] self-end mt-1 font-['Inknut_Antiqua'] ${charCount >= MAX_CHARS ? 'text-red-500' : 'opacity-50'}`}>
							{charCount} / {MAX_CHARS} caracteres
						</span>
					</div>

					<Button type='submit' className='self-center'>Share!</Button>
				</Form>
		</main>
	</Layout>
}
