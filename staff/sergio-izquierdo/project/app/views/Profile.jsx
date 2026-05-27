import { useState, useEffect } from 'react'

import { Layout } from "./components/commons/Layout"
import { Header } from "./components/commons/Header"
import { FieldTextTareaCharCounter } from './components/commons/FieldTextTareaCharCounter'
import { Input } from './components/commons/Input'
import { AvatarProfile } from './components/commons/AvatarProfile'
import { ProfileButton } from "./components/commons/lucide/ProfileButton"
import { LandingButton } from "./components/commons/lucide/LandinButton"
import { LogoutButton } from "./components/commons/lucide/LogoutButton"
import { BackButton } from './components/commons/lucide/BackButton'
import { SaveButton } from './components/commons/lucide/SaveButton'
import { EditButton } from './components/commons/lucide/EditButton'
import { BarraNav } from './components/commons/BarraNav'
import { BackArtistHomeNavButton } from './components/commons/lucide/BackArtistHomeNavButton'

import { logger } from "../logger"

import { useContext } from '../context'

import { logic } from '../logic'

export function Profile({ onGoToLanding, onGoToArtistHome, onGoToAddArt, onUserLoggedOut }) {
	logger.debug('Profile -> call')

	const speciality = 'Creador en AppasionArte'

	const { onError, onSuccess } = useContext()

	const [username, setUsername] = useState('')
	const [image, setImage] = useState('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnBncmJzbTdkcWozbGgzaDJic3I2ZWxhZ2xnZnVqZTU0MHp1cWUyaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Pj6TQs4cuQ7LAhebA5/giphy.gif')

	const [isEditing, setIsEditing] = useState(false)
	const [description, setDescription] = useState('')

	const [isEditingImage, setIsEditingImage] = useState(false)
	const [newImage, setNewImage] = useState('')

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
	const handleSaveImage = () => {
		try {
			logic.modifyUserImage(newImage)
				.then(() => {
					setImage(newImage)
					setIsEditingImage(false)
					onSuccess('Image updated successfully!')
				})
				.catch(error => onError(error))
		} catch (error) {
			onError(error)
		}
	}

	const handleImageInputChange = event => setNewImage(event.target.value)

	const handleCharCountChange = event => setDescription(event.target.value)

	logger.debug('Profile -> render')
	return (
		<Layout className="h-screen flex flex-col overflow-hidden">
			<div className='sticky top-0 z-50 w-full bg-[#E5D6D6] shrink-0 shadow-md'>
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

				<div className="relative inline-block">
					<AvatarProfile username={username} image={image} speciality={speciality} />
					<div className="absolute bottom-16 right-0">
						{isEditingImage ? (
							<SaveButton onClick={handleSaveImage} />
						) : (
							<EditButton onClick={() => setIsEditingImage(true)} />
						)}
					</div>
				</div>

				{isEditingImage && (
					<Input
						type="text"
						alias="image"
						placeholder="Paste image URL here..."
						value={newImage}
						onChange={handleImageInputChange}
						className="border border-black bg-white p-2 text-sm text-[#3F295F] rounded-lg"
					/>
				)}
				<section className="w-full bg-white p-6 rounded-2xl shadow-sm border border-black/5">
					<div className="flex justify-between items-center mb-3">
						<h3 className="font-['Inknut_Antiqua'] text-[#3F295F] text-xs uppercase tracking-widest">
							About me
						</h3>
						<div className="flex items-center min-w-8">
							{isEditing ? (

								<SaveButton onClick={handleSaveDescription} />
							) : (
								
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
