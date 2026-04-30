import { Layout } from './components/commons/Layout'
import { Header } from './components/commons/Header'
import { Paragraph } from './components/commons/Paragraph'
import { Form } from './components/commons/Form'
import { Field } from './components/commons/Field'
import { PasswordField } from './components/commons/PasswordField'
import { Button } from './components/commons/Button'
import { Footer } from './components/commons/Footer'
import { Anchor } from './components/commons/Anchor'
import { LandingButton } from './components/commons/lucide/LandinButton'

import { useContext } from '../context'

import { logic } from '../logic'

import { logger } from '../logger'

export function Login({ onUserLoggedIn, onGoToRegister, onGoToLanding }) {
	logger.debug('Login -> call')

	const { onError } = useContext()

	const handleLoginSubmit = event => {
		event.preventDefault()

		const form = event.target

		const username = form.username.value
		const password = form.password.value

		try {
			logic.loginUser(username, password)
				.then(() => onUserLoggedIn())
				.catch(error => onError(error))
		} catch (error) {
			onError(error)

		}
	}

	const handleRegisterClick = event => {
		event.preventDefault()

		onGoToRegister()
	}

	const handleLandingButtonClick = event => {
		event.preventDefault()

		onGoToLanding()
	}

	logger.debug('Login -> render')

	return <Layout>
		<Header title='Login'>

		</Header>

		<Form onSubmit={handleLoginSubmit}>
			<Field alias='username' type='text'>Username:</Field>

			<PasswordField alias='password'>Password:</PasswordField>

			<Button>Login</Button>
		</Form>
		<span className='fixed bottom-4 right-5 z-50'>
			<LandingButton onClick={handleLandingButtonClick}/>
		</span>
		<Footer className='mb-5'>
			<Anchor onClick={handleRegisterClick}>Register</Anchor>
		</Footer>

	</Layout>

}
