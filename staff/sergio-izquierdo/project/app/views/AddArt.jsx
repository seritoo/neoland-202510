import { useState, useEffect } from 'react'

import { Layout } from './components/commons/Layout'
import { Header } from './components/commons/Header'
import { Form } from './components/commons/Form'
import { Field } from './components/commons/Field'
import { Label } from './components/commons/Label'
import { Button } from './components/commons/Button'
import { BackButton } from './components/commons/lucide/BackButton'
import { ProfileButton } from './components/commons/lucide/ProfileButton'
import { LandingButton } from './components/commons/lucide/LandinButton'
import { LogoutButton } from './components/commons/lucide/LogoutButton'
import { AvatarSalute } from './components/commons/AvatarSalute'
import { BarraNav } from './components/commons/BarraNav'

import { useContext } from '../context'

import { logic } from '../logic'

import { logger } from '../logger'
import { FieldTextTareaCharCounter } from './components/commons/FieldTextTareaCharCounter'

export function AddArt({ onGoToArtistHome, onGoToProfile, onGoToLanding }) {
	logger.debug('AddArt -> call')

	const [shortStory, setShortStory] = useState('')
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
		event.preventDefault()

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

	const handleCharCountChange = event => setShortStory(event.target.value)

	logger.debug('ArtistHome -> render')
	return <Layout  className="h-screen overflow-hidden flex flex-col items-stretch">
		<div className='sticky top-0 z-50 w-full bg-[#E5D6D6] shrink-0 shadow-md'>
		<Header title='Share your art!'>
			<BarraNav>
				<LandingButton onClick={handleLandingClick} />
				<ProfileButton onClick={handleProfileClick} />
				<BackButton onClick={handleBackClick} />
				<LogoutButton onClick={handleLogoutClick} />
			</BarraNav>

			<AvatarSalute username={username}/>
		</Header>
		</div>
		<main className='flex-1 overflow-y-auto pt-2 px-6 bg-[#E5D6D6]'>
			<Form onSubmit={handleShareArtSubmit} className='w-full'>
				<Field alias='title' type='text'>Title:</Field>
			<FieldTextTareaCharCounter
			label= 'Short Story:'
			name='shorStory'
			value={shortStory}
			onChange={handleCharCountChange}
			maxLength={5000}
			className='border border-black bg-white min-h-30 focus:ring-[#E94E77]' />


			<Button type='submit' className='self-center'>Share, please!</Button>
		</Form>
	</main>
	</Layout >
}
