
import { Form } from './components/commons/Form'
import { Field } from './components/commons/Field'
import { PasswordField } from './components/commons/PasswordField'
import { Title } from './components/commons/Title'
import { Button } from './components/commons/Button'
import { Anchor } from './components/commons/Anchor'

import { logic } from '../logic'

export function Login({ onUserLoggedIn, onGoToRegister }) {
    console.log('Login -> call')

    const handleLoginSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const password = form.password.value

        try {
            logic.authenticateUser(username, password)
                .then(() => onUserLoggedIn())
                .catch(error => onerror(error))
        } catch (error) {
           onerror(error)
        }
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        onGoToRegister()
    }

    console.log('Login -> render')

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
