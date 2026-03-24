
import { Form } from './components/commons/Form'
import { Field } from './components/commons/Field'
import { PasswordField } from './components/commons/PasswordField'
import { Title } from './components/commons/Title'
import { Button } from './components/commons/Button'
import { Anchor } from './components/commons/Anchor'

import { useContext } from '../context'

import { logic } from '../logic'

import { logger } from '../logger'


export function Login({ onUserLoggedIn, onGoToRegister }) {
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

    logger.debug('Login -> render')

    return <div className="p-6">
        <Title className="mb-4">MyPet</Title>

        {/*<h2 className="flex justify-center font-bold text-xl p-2">Login</h2>*/}

        <Form className="flex flex-col" onSubmit={handleLoginSubmit}>
            <Field alias="username" type="text">Username:</Field>

            <PasswordField alias="password">Password:</PasswordField>

            <Button className="self-center" type="submit">Login</Button>
        </Form>

        <Anchor className="p-2" onClick={handleRegisterClick}>Register</Anchor>
    </div>
}
