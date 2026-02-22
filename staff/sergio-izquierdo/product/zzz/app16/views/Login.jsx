import { useState } from 'react'

import { Form } from './components/commons/Form'
import { Field } from './components/commons/Field'
import { PasswordField } from './components/commons/PasswordField'
import { Button } from './components/commons/Button'
import { Anchor } from './components/commons/Anchor'
import { Feedback} from './components/commons/Feedback'



import { logic } from '../logic'

export function Login({ onGoToHome, onGoToRegister }) {
    console.log('Login -> call')

     const [feedback, setFeedback] = useState(null)
    const [passwordType, setPasswordType] = useState('password')

    const handleLoginSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const password = form.password.value

        try {
            logic.loginUser(username, password)
                .then(() => {
                    form.reset()

                    setFeedback(null)
                    setPasswordType('password')

                    onGoToHome()
                })
                .catch(error => setFeedback({ message: error.message, level: 'error' }))
        } catch (error) {
            setFeedback({ message: error.message, level: 'error' })
        }
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        onGoToRegister()
    }

    console.log('Login -> render')

    return <div className="p-4">
        <h1 className="font-bold text-green-500 text-4xl">MyPet</h1>

        <h2 className="flex justify-center font-bold text-xl p-2">Login</h2>

        <Form className="flex flex-col" onSubmit={handleLoginSubmit}>
            <Field alias="username" type="text">Username:</Field>

            <PasswordField alias="password">Password:</PasswordField>

            <Button className="self-center" type="submit">Login</Button>
        </Form>

        <Anchor className="cursor-pointer underline font-bold" onClick={handleRegisterClick}>Register</Anchor>

        {feedback && <Feedback feedback={feedback} />}
    </div>
}
