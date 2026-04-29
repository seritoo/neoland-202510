import { useState, useEffect } from "react"

import { useParams } from 'react-router'

import { Layout } from "./components/commons/Layout"
import { Header } from "./components/commons/Header"
import { BarraNav } from "./components/commons/BarraNav"
import { Avatar } from "./components/commons/Avatar"
import { ConfirmDeleteModal } from "./components/ConfirmDeleteModal"
import { AddArtButton } from "./components/commons/lucide/AddArtButton"
import { ProfileButton } from "./components/commons/lucide/ProfileButton"
import { BackButton } from "./components/commons/lucide/BackButton"
import { LogoutButton } from "./components/commons/lucide/LogoutButton"
import { EditButton } from "./components/commons/lucide/EditButton"
import { SaveButton } from "./components/commons/lucide/SaveButton"
import { DeleteShortStoryButton } from "./components/commons/lucide/DeleteShortStoryButton"
import { FieldTextTareaCharCounter } from "./components/commons/FieldTextTareaCharCounter"

import { useContext } from '../context'

import { logic } from '../logic'

import { logger } from "../logger"

export function ShortStoryDetail({ onGoToAddArt, onGoToProfile, onGoToArtistHome, onUserLoggedOut }) {
	logger.debug('ShortStoryDetail -> call')

	const { onError, onSuccess } = useContext()

	const [title, setTitle] = useState('')
	const [storyText, setStoryText] = useState('')
	const [isEditing, setIsEditing] = useState(false)


	const [username, setUsername] = useState(null)
	const [image, setImage] = useState(null)

	const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)

	const { storyId } = useParams()

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
		logger.debug('ShortStoryDetail -> useEffect')
		try {
			logic.getMyStory(storyId)
				.then(story => {
					setTitle(story.title)
					setStoryText(story.shortStory)
				})
				.catch(error => onError(error))
		} catch (error) {
			onError(error)
		}
	}, [storyId])

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
	const handleCharCountChange = event => setStoryText(event.target.value)

	const handleTitleChange = (event) => setTitle(event.target.value)

	const handleSaveShortStory = () => {
		try {
			logic.modifyShortStory(storyId, title, storyText)
				.then(() => {
					setIsEditing(false)
					onSuccess('Short story updated successfully!!')
				})
				.catch(error => onError(error))
		} catch (error) {
			onError(error)
		}
	}

	const handleAskDeleteClick = () => setIsConfirmingDelete(true)

	const handleCancelDeleteClick = () => setIsConfirmingDelete(false)

	const handleConfirmDeleteClick = () => {
		setIsConfirmingDelete(false)
		try {
			logic.removeShortStory(storyId)
				.then(() => {
					onSuccess('Short tory deleted successfully')
					onGoToArtistHome()
				})
				.catch(error => onError(error))
		} catch (error) {
			onError(error)
		}
	}


	logger.debug('ShortStoryDetail -> render')

	return <Layout className="h-screen overflow-hidden flex flex-col items-stretch">
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
				<Avatar image={image} />
				<h2 className="font-['Inknut_Antiqua'] text-[#3F295F] text-xl">
					Hola, {username || 'Artist'}!
				</h2>
			</div>
		</div>
		<main className="flex-1 overflow-y-auto p-6 bg-[#E5D6D6] flex flex-col items-stretch">
			<section className="min-w-full bg-white p-6 rounded-2xl shadow-sm border border-black/5">

				<div className="flex flex-col items-stretch mb-10">
					<div className="flex justify-between items-center mb-4 w-full">
						<div className="flex items-center min-w-8">
							{isEditing ? (
								<SaveButton onClick={handleSaveShortStory} />
							) : (
								<EditButton onClick={() => setIsEditing(true)} />
							)}
						</div>
						<DeleteShortStoryButton onClick={handleAskDeleteClick} />
					</div>

					{isEditing ? (
						<input
							type="text"
							value={title}
							onChange={handleTitleChange}
							className="font-['Inknut_Antiqua'] text-[#3F295F] text-2xl mb-6 px-2 bg-white/50 border-b border-[#3F295F] focus:outline-none w-full"
							placeholder="Short story title" />)
						:
						(<h1 className="font-['Inknut_Antiqua'] text-[#3F295F] text-2xl mb-6 px-2 w-full text-left">
							{title || 'Cargando título...'} </h1>)}
				</div>
				{isEditing ? (
					<FieldTextTareaCharCounter
						name='storyText'
						value={storyText}
						onChange={handleCharCountChange}
						maxLength={5000}
						className='bg-white min-h-30 focus:ring-[#E94E77]' />) :
					(<p className="text-sm leading-relaxed text-[#3F295F] text-justify opacity-90">{storyText}</p>)}
			</section>
		</main>
		{isConfirmingDelete && (
			<ConfirmDeleteModal
				message='Are you sure!!??'
				onConfirm={handleConfirmDeleteClick}
				onCancel={handleCancelDeleteClick}
			/>
		)}
	</Layout >
}
