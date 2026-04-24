import { useState, useEffect } from 'react'

import { Layout } from "./components/commons/Layout"
import { Header } from "./components/commons/Header"
import { ProfileButton } from "./components/lucide/ProfileButton"
import { LandingButton } from "./components/lucide/LandinButton"
import { LogoutButton } from "./components/lucide/LogoutButton"

import { logger } from "../logger"
import { BackButton } from './components/lucide/BackButton'
import { BackArtistHomeNavButton } from './components/lucide/BackArtistHomeNavButton'

import { useContext } from '../context'

import { logic } from '../logic'

export function Profile({ onGoToLanding, onGoToArtistHome, onGoToAddArt, onUserLoggedOut }) {

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
					onSuccess('Profile updated!')
				})
				.catch(error => onError(error))
		} catch (error) {
			onError(error)
		}
	}

	return (
		<Layout className="h-screen flex flex-col overflow-hidden">
			<div className='w-full bg-[#E5D6D6] z-50 shadow-sm'>
				<Header title='My Profile'>
					<nav className='flex justify-between w-full nav-gradient-artist h-10 px-10 mt-5'>

						<LandingButton onClick={handleLandingClick} />
						<BackArtistHomeNavButton onClick={handleBackArtistHomeClick} />
						<BackButton onClick={handleBackClick} />
						<LogoutButton onClick={handleLogoutClick} />

					</nav>
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
						<button onClick={isEditing ? handleSaveDescription : () => setIsEditing(true)}
							className="text-[10px] text-purple-600 font-bold hover:underline">
							{isEditing ? 'GUARDAR' : 'EDITAR'}
						</button>
					</div>
					{isEditing ? (
						<textarea
							value={description}
							onChange={(event) => setDescription(event.target.value)}
							className="w-full text-sm leading-relaxed p-2 border border-dashed border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-400 min-h-35 resize-none font-sans"
							autoFocus
						/>
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
