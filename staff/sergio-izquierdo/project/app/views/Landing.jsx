import { ArtButton } from './components/ArtButton'
import { Layout } from './components/commons/Layout'
import { Header } from './components/commons/Header'
import { Paragraph } from './components/commons/Paragraph'
import { Anchor } from './components/commons/Anchor'
import { Footer } from './components/commons/Footer'

import { logger } from '../logger'

export function Landing({ onGoToShorStories, onGoToLogin, onGoToRegister }) {
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

	logger.debug('Landing -> render')

	return <Layout>
		<Header isLanding={true}>
			<Paragraph>What art would you like to enjoy today...?</Paragraph>
		</Header>
		<main className='mt-15'>
			<ArtButton onClick={handleStoriesClick}>Short Stories</ArtButton>
		</main>
		<Footer className="mt-auto w-full px-12">
			<Anchor onClick={handleLoginClick}>Login</Anchor> <Anchor onClick={handleRegisterClick}>Register</Anchor>
		</Footer>
	</Layout>
}
