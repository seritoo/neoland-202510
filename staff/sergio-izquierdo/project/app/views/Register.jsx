import { Layout } from './components/commons/Layout'
import { Header } from './components/commons/Header'
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

export function Register({ onGoToLogin, onGoToLanding }) {
	logger.debug('Register -> call')

	const { onError } = useContext()

	const handleRegisterSubmit = event => {
		event.preventDefault()

		const form = event.target

		const name = form.name.value
		const email = form.email.value
		const username = form.username.value
		const password = form.password.value
		const passwordRepeat = form.passwordRepeat.value

		try {
			logic.registerUser(name, email, username, password, passwordRepeat)
				.then(() => {
					form.reset()

					onGoToLogin()
				})
				.catch(error => onError(error))
		} catch (error) {
			onError(error)
		}
	}

	const handleLoginClick = event => {
		event.preventDefault()

		onGoToLogin()
	}

	const handleLandingButtonClick = event => {
		event.preventDefault()

		onGoToLanding()
	}

	logger.debug('Register -> render')

	return <Layout>
		<Header title='Register'></Header>

		<Form onSubmit={handleRegisterSubmit}>
			<Field alias='name' type='text'>Name:</Field>

			<Field alias='email' type='email'>Email:</Field>

			<Field alias='username' type='username'>Username:</Field>

			<PasswordField alias='password'>Password:</PasswordField>

			<PasswordField alias='passwordRepeat'> Repeat Password:</PasswordField>

			<Button>Register</Button>
		</Form>
		<span className='fixed bottom-4 right-5 z-50'>
			<LandingButton onClick={handleLandingButtonClick} />
		</span>

		<Footer className='mb-5'>
			<Anchor onClick={handleLoginClick}>Login</Anchor>
		</Footer>
	</Layout>
}
