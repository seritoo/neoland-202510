import { useState, useEffect } from 'react'

import { Layout } from "./components/commons/Layout"
import { Header } from "./components/commons/Header"
import { ProfileButton } from "./components/commons/lucide/ProfileButton"
import { LandingButton } from "./components/commons/lucide/LandinButton"
import { LogoutButton } from "./components/commons/lucide/LogoutButton"
import { BackButton } from './components/commons/lucide/BackButton'
import { SaveButton } from './components/commons/lucide/SaveButton'
import { EditButton } from './components/commons/lucide/EditButton'
import { BarraNav } from './components/commons/BarraNav'
import { BackArtistHomeNavButton } from './components/commons/lucide/BackArtistHomeNavButton'
import { FieldTextTareaCharCounter } from './components/commons/FieldTextTareaCharCounter'

import { logger } from "../logger"

import { useContext } from '../context'

import { logic } from '../logic'

export function Profile({ onGoToLanding, onGoToArtistHome, onGoToAddArt, onUserLoggedOut }) {
	logger.debug('Profile -> call')

	const speciality = 'Creador en AppasionArte'

	const { onError, onSuccess } = useContext()

	const [username, setUsername] = useState('')
	const [image, setImage] = useState(null)

	const [description, setDescription] = useState('')
	const [isEditing, setIsEditing] = useState(false)

	useEffect(() => {
		logger.debug('ArtistHome -> useEffect')
		try {
			logic.getLoggedInUser()
				.then(user => {
					setUsername(user.username)
					setImage(user.image || image)
					setDescription(user.description || '')
				})
				.catch(error => onError(error))
		} catch (error) {
			onError(error)
		}
	}, [])
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

	const handleBackArtistHomeClick = event => {
		event.preventDefault()

		onGoToArtistHome()
	}

	const handleBackClick = event => {
		event.preventDefault()

		onGoToAddArt()
	}

	const handleSaveDescription = () => {
		try {
			logic.modifyUserDescription(description)
				.then(() => {
					setIsEditing(false)
					onSuccess('Description updated successfully!')
				})
				.catch(error => onError(error))
		} catch (error) {
			onError(error)
		}
	}

	const handleCharCountChange = event => setDescription(event.target.value)

	logger.debug('Profile -> render')
	return (
		<Layout className="h-screen flex flex-col overflow-hidden">
			<div className='w-full bg-[#E5D6D6] z-50 shadow-sm'>
				<Header title='My Profile'>

					<BarraNav>
						<LandingButton onClick={handleLandingClick} />
						<BackArtistHomeNavButton onClick={handleBackArtistHomeClick} />
						<BackButton onClick={handleBackClick} />
						<LogoutButton onClick={handleLogoutClick} />
					</BarraNav>

				</Header>
			</div>

			<main className='flex-1 overflow-y-auto w-full flex flex-col items-center px-8 py-10 gap-8'>

				<div className="flex flex-col items-center gap-4">
					<div className="w-28 h-28 rounded-full border-2 border-[#3F295F] overflow-hidden shadow-md">
						{image ? (
							<img src={image} alt={username} className='w-full h-full object-cover' />
						) : (
							<div className="w-full h-full bg-slate-200 flex items-center justify-center text-[#3F295F] opacity-30 text-xs text-center p-2">No image</div>
						)}
					</div>

					<div className="text-center">
						<h2 className="font-['Inknut_Antiqua'] text-[#3F295F] text-2xl lowercase">
							{username}
						</h2>
						<p className="text-sm opacity-60 italic mt-1">{speciality}</p>
					</div>
				</div>

				<section className="w-full bg-white p-6 rounded-2xl shadow-sm border border-black/5">
					<div className="flex justify-between items-center mb-3">
						<h3 className="font-['Inknut_Antiqua'] text-[#3F295F] text-xs uppercase tracking-widest">
							About me
						</h3>
						<div className="flex items-center min-w-8">
							{isEditing ? (
								// Cuando editamos, mostramos el de GUARDAR
								<SaveButton onClick={handleSaveDescription} />
							) : (
								// Cuando no editamos, mostramos el de EDITAR
								<EditButton onClick={() => setIsEditing(true)} />
							)}
						</div>
					</div>
					{isEditing ? (

						<FieldTextTareaCharCounter
							name='description'
							value={description}
							onChange={handleCharCountChange}
							maxLength={300}
							className='border border-black bg-white min-h-30 focus:ring-[#E94E77]' />
					) : (
						<p className="text-sm leading-relaxed text-[#3F295F] text-justify opacity-90">
							{description || 'Tell us about you...'}
						</p>
					)}
				</section>
			</main>
		</Layout>
	)
}
