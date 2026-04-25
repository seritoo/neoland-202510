import { useState, useEffect } from 'react'

import { Routes, Route, useNavigate, Navigate } from 'react-router'

import { Landing } from './views/Landing'
import { Login } from './views/Login'
import { Register } from './views/Register'
import { ArtistHome } from './views/ArtistHome'
import { AddArt } from './views/AddArt'
import { Profile } from './views/Profile'
import { ShortStoryDetail } from './views/ShortStoryDetail'
import { Feedback } from './views/components/commons/Feedback'
import { Context } from './context'

import { AuthError, ValidationError, ExistenceError, CredentialError, DuplicityError } from 'com'
import { logic } from './logic'

import { logger } from './logger'

export function App() {
	logger.debug('App -> call')

	const [feedback, setFeedback] = useState(null)
	let loggedIn = false

	const navigate = useNavigate()

	try {
		loggedIn = logic.isUserLoggedIn()
	} catch (error) {
		setFeedback({ message: error.message })
	}

	const clearFeedbackAndNavigate = path => {
		setFeedback(null)
		navigate(path)
	}

	const handleGoToLogin = () => clearFeedbackAndNavigate('/login')
	const handleGoToRegister = () => clearFeedbackAndNavigate('/register')
	const handleGoToShortStories = () => clearFeedbackAndNavigate('/short-stories')
	const handleGoToArtistHome = () => clearFeedbackAndNavigate('/')
	const handleGoToProfile = () => clearFeedbackAndNavigate('/profile')
	const handleGoToAddArt = () => clearFeedbackAndNavigate('/add-art')
	const handleGoToLanding = () => clearFeedbackAndNavigate('/landing')
	const handleGoToShortStoryDetail = () => clearFeedbackAndNavigate('/stories/storyId:')

	const handleError = error => {
		if (error instanceof AuthError) {
			try {
				logic.logoutUser()

				logger.error(error)
				setFeedback({ message: 'Oops! Login failed. Please, log in again', level: 'error' })
				navigate('/login')
			} catch (error) {
				logger.fatal(error)
				setFeedback({ message: 'sorry! there was an error on logout. Please, try it later!', level: 'error' })
			}
		} else if (error instanceof ValidationError) {
			logger.warn(error)
			setFeedback({ message: error.message, level: 'warn' })
		} else if (error instanceof ExistenceError || error instanceof CredentialError || error instanceof DuplicityError) {
			logger.error(error)
			setFeedback({ message: error.message, level: 'danger' })
		} else {
			logger.fatal(error)
			setFeedback({ message: 'sorry, something failed. Please, try again later' })
		}
	}

	const handleSuccess = message => setFeedback({ message, level: 'success' })

	const handleClear = () => setFeedback(null)

	logger.debug('App -> render')

	const contextValue = {
		onSuccess: handleSuccess,
		onError: handleError,
		onClear: handleClear
	}




	return <Context.Provider value={contextValue}>

		{feedback && <Feedback feedback={feedback} />}

		<Routes>
			<Route path="/" element={!loggedIn ?
				<Landing onGoToShortStories={handleGoToShortStories} onGoToLogin={handleGoToLogin} onGoToRegister={handleGoToRegister} />
				:
				<ArtistHome onGoToProfile={handleGoToProfile} onGoToAddArt={handleGoToAddArt} onGoToLanding={handleGoToLanding} onGoToShortStoryDetail={handleGoToShortStoryDetail} onUserLoggedOut={handleGoToLogin} />} />

			<Route path="/login" element={!loggedIn ? <Login onUserLoggedIn={handleGoToArtistHome} onGoToRegister={handleGoToRegister} /> : <Navigate to="/" />} />

			<Route path="/register" element={!loggedIn ? <Register onGoToLogin={handleGoToLogin} /> : <Navigate to="/" />} />

			<Route path="/add-art" element={loggedIn ? <AddArt onGoToArtistHome={handleGoToArtistHome} onGoToProfile={handleGoToProfile} onGoToLanding={handleGoToLanding} /> : <Navigate to="/login" />} />

			<Route path="/landing" element={<Landing loggedIn={loggedIn}
				onGoToShorStories={handleGoToShortStories} onGoToLogin={handleGoToLogin} onGoToRegister={handleGoToRegister} onGoToArtistHome={handleGoToArtistHome}  />} />

			<Route path="/profile" element={loggedIn ?
				<Profile onGoToLanding={handleGoToLanding} onGoToArtistHome={handleGoToArtistHome} onGoToAddArt={handleGoToAddArt} onUserLoggedOut={handleGoToLogin} />
				:
				<Navigate to="/login" />} />

			<Route
				path="/stories/:storyId"
				element={
					<ShortStoryDetail loggedIn={loggedIn} onGoToArtistHome={handleGoToArtistHome} onGoToAddArt={handleGoToAddArt} onGoToProfile={handleGoToProfile} onUserLoggedOut={handleGoToLogin} onGoToLogin={handleGoToLogin} onGoToRegister={handleGoToRegister} /> } />

		</Routes>
	</Context.Provider>
}
