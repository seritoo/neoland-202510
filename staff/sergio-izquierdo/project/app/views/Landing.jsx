import { ArtButton } from './components/ArtButton'
import { Layout } from './components/commons/Layout'
import { Header } from './components/commons/Header'
import { Paragraph } from './components/commons/Paragraph'
import { Anchor } from './components/commons/Anchor'
import { Footer } from './components/commons/Footer'

import { logger } from '../logger'
import { BackArtistHomeButton } from './components/commons/lucide/BackArtistHomeButton'

export function Landing({ onGoToShorStories, onGoToLogin, onGoToRegister, onGoToArtistHome, loggedIn }) {
	logger.debug('Landing -> call')

	const handleStoriesClick = event => {
		event.preventDefault()

		onGoToShorStories()
	}

	const handleLoginClick = event => {
		event.preventDefault()

		onGoToLogin()
	}

	const handleRegisterClick = event => {
		event.preventDefault()

		onGoToRegister()
	}

	const handleBackToArtistHomeClick = event => {
		event.preventDefault()

		onGoToArtistHome()
	}

	logger.debug('Landing -> render')

	return <Layout className="h-screen flex flex-col p-10 pt-20 items-center w-full">
		<Header isLanding={true}>
			<Paragraph className="text-center max-w-45 leading-relaxed">What art would you like to enjoy today...?</Paragraph>
		</Header>
		<main className=' flex items-center justify-center mt-10'>
			<ArtButton onClick={handleStoriesClick}>Short Stories</ArtButton>
		</main>
		<Footer>
			{!loggedIn ? (
				<>
					<Anchor onClick={handleLoginClick}>Login</Anchor>
					<Anchor onClick={handleRegisterClick}>Register</Anchor>
				</>
			) : (
				<Anchor onClick={handleBackToArtistHomeClick}>
					<BackArtistHomeButton />
				</Anchor>
			)}
		</Footer>
	</Layout>
}
