import { useState } from 'react'

import { Form } from './components/commons/Form'
import { Field } from './components/commons/Field'
import { Button } from './components/commons/Button'
import { Anchor } from './components/commons/Anchor'
import { Feedback } from './components/commons/Feedback'


import { logic } from '../logic'

export function ModifyPet({ onGoToHome }) {
    console.log('ModifyPet -> call')

    const [feedback, setFeedback] = useState(null)

    const handleBackClick = event => {
        event.preventDefault()

        onGoToHome()
    }

    const handleModifyPetSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const birthdate = form.birthdate.value
        const weight = Number(form.weight.value)
        const image = form.image.value

        try {
            logic.modifyPet(name, birthdate, weight, image)
                .then(() => setFeedback({ message: 'pet successfully modify', level: 'succes' }))   // si todo ha ido bien en el callback de logic
                .catch(error => setFeedback({ message: error.message, level: 'error' }))
        } catch (error) {
            setFeedback({ message: error.message, level: 'error' })
        }
    }

    console.log('ModifyPet -> render')

    return <div className="p-4">
        <h1 className="font-bold text-xl">MyPet</h1>

        <div className="flex justify-between">
            <h2 className="font-bold">Add Pet</h2>

            <Anchor onClick={handleBackClick}>&lt; Back</Anchor>
        </div>

        <Form onSubmit={handleModifyPetSubmit}>
            <Field alias="name" type="text">Name</Field>

            <Field alias="birthdate" type="date">Birthdate</Field>

            <Field alias="weight" type="number">Weight (kg)</Field>

            <Field alias="image" type="url">Image</Field>

            <Button className="self-center mt-4" type="submit">Add Pet</Button>
        </Form>

        {feedback && <Feedback feedback={feedback} />}
    </div>
}
