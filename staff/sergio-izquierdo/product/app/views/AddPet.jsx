import { useState } from 'react'

import { Form } from './components/commons/Form'
import { Field } from './components/commons/Field'
import { Title } from './components/commons/Title'
import { Button } from './components/commons/Button'
import { Anchor } from './components/commons/Anchor'
import { Feedback } from './components/commons/Feedback'


import { logic } from '../logic'

export function AddPet({ onGoToHome }) {
    console.log('AddPet -> call')

    const [feedback, setFeedback] = useState(null)

    const handleBackClick = event => {
        event.preventDefault()

        onGoToHome()
    }

    const handleAddPetSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const birthdate = form.birthdate.value
        const weight = Number(form.weight.value)
        const image = form.image.value

        try {
            logic.addPet(name, birthdate, weight, image)
                .then(() => {   // si todo ha ido bien en el callback de logic
                    form.reset()

                    onGoToHome()
                })
                .catch(error => setFeedback({ message: error.message, level: 'error' }))
        } catch (error) {
            setFeedback({ message: error.message, level: 'error' })
        }
    }

    console.log('AddPet -> render')

    return <div className="p-4">
        <Title>MyPet</Title>

        <div className="flex justify-between">
            {/*<h2 className="font-bold">Add Pet</h2>*/}

            <Anchor onClick={handleBackClick}>&lt; Back</Anchor>
        </div>

        <Form onSubmit={handleAddPetSubmit}>
            <Field alias="name" type="text">Name</Field>

            <Field alias="birthdate" type="date">Birthdate</Field>

            <Field alias="weight" type="number">Weight (kg)</Field>

            <Field alias="image" type="url">Image</Field>

            <Button className="self-center mt-4" type="submit">Add Pet</Button>
        </Form>

        {feedback && <Feedback feedback={feedback} />}
    </div>
}
