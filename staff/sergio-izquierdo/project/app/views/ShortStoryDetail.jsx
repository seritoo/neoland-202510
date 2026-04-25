import { useState, useEffect } from "react"

import { Layout } from "./components/commons/Layout"
import { Header } from "./components/commons/Header"
import { BarraNav } from "./components/commons/BarraNav"
import { Avatar } from "./components/commons/Avatar"
import { AddArtButton } from "./components/commons/lucide/AddArtButton"
import { ProfileButton } from "./components/commons/lucide/ProfileButton"
import { BackButton } from "./components/commons/lucide/BackButton"
import { LogoutButton } from "./components/commons/lucide/LogoutButton"
import { FieldTextTareaCharCounter } from "./components/commons/FieldTextTareaCharCounter"

import { logger } from "../logger"

import { useContext } from '../context'

import { logic } from '../logic'




export function ShortStoryDetail({ onGoToAddArt, onGoToProfile, onGoToArtistHome, onUserLoggedOut }) {
	logger.debug('ShortStoryDetail -> call')

	const { onError, onSuccess } = useContext()

	const [shortStory, setShortStory] = useState('')
	const [isEditing, setIsEditing] = useState(false)


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

	const handleAddArtClick = event => {
		event.preventDefault()

		onGoToAddArt()
	}

	const handleProfileClick = event => {
		event.preventDefault()

		onGoToProfile()
	}

	const handleBackClick = event => {
		event.preventDefault()

		onGoToArtistHome()
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
	const handleCharCountChange = event => setShortStory(event.target.value)

	const handleSaveDescription = () => {
		try {
			logic.modifyUserShortStory(shortStory)
			.then(() => {
				setIsEditing(false)
				onSuccess('Your Short story have been updated')
			})
		} catch (error) {

		}
	}

	logger.debug('ShortStoryDetail -> render')

	return <Layout className="h-screen overflow-hidden flex flex-col">
		<div className='sticky top-0 z-50 w-full bg-[#E5D6D6] shadow-sm'>
			<Header title='Short Story'>
				<BarraNav>
					<AddArtButton onClick={handleAddArtClick} />
					<ProfileButton onClick={handleProfileClick} />
					<BackButton onClick={handleBackClick} />
					<LogoutButton onClick={handleLogoutClick} />
				</BarraNav>
			</Header>
			<div className="flex justify-start items-center w-full gap-3 p-3 bg-[#E5D6D6]">
				<Avatar />
				<h2 className="font-['Inknut_Antiqua'] text-[#3F295F] text-xl">
					Hola, {username || 'Artist'}!
				</h2>
			</div>
			<main>
				<section className="w-full bg-white p-6 rounded-2xl shadow-sm border border-black/5">
					<div className="flex justify-between items-center mb-3">
						<button onClick={isEditing ? handleSaveDescription : () => setIsEditing(true)}
							className="text-[10px] text-purple-600 font-bold hover:underline">
							{isEditing ? 'GUARDAR' : 'EDITAR'}
						</button>
					</div>
					{isEditing ? (
						<FieldTextTareaCharCounter
							name='shorStory'
							value={shortStory}
							onChange={handleCharCountChange}
							maxLength={5000}
							className='bg-white min-h-30 focus:ring-[#E94E77]' />
						) : (
							<p className="text-sm leading-relaxed text-[#3F295F] text-justify opacity-90">
							{shortStory}
						</p>
						)
					}
				</section>
			</main>

		</div>

	</Layout >
}
