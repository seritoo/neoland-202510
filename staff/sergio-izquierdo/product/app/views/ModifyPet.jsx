import { useState, useEffect } from 'react'

import { Form } from './components/commons/Form'
import { Field } from './components/commons/Field'
import { Title } from './components/commons/Title'
import { ButtonSecondary } from './components/commons/ButtonSecondary'
import { Anchor } from './components/commons/Anchor'
import { Feedback } from './components/commons/Feedback'
import { Spinner} from './components/Spinner'


import { logic } from '../logic'

export function ModifyPet({ petId, onGoBack }) {  // usamos petId para cuando carguemos esta vista, se traiga los datos y aparezcan precargados
    console.log('ModifyPet -> call')

    const [feedback, setFeedback] = useState(null)
    const [pet, setPet] = useState(null)

        useEffect(() => {
            setTimeout(() => {
            try {

                logic.getPet(petId)
                    .then(pet => setPet(pet))
                    .catch(error => setFeedback({ message: error.message, level: 'error' }))
            } catch (error) {
                setFeedback({ message: error.message, level: 'error' })
            }
        },3000)
        }, [])

    const handleBackClick = event => {
        event.preventDefault()

        onGoBack()
    }

    const handleModifyPetSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const birthdate = form.birthdate.value
        const weight = Number(form.weight.value)
        const image = form.image.value

        try {
            logic.modifyPet(petId, name, birthdate, weight, image)
                .then(() => setFeedback({ message: 'pet successfully modify', level: 'success' }))   // si todo ha ido bien en el callback de logic
                .catch(error => setFeedback({ message: error.message, level: 'error' }))
        } catch (error) {
            setFeedback({ message: error.message, level: 'error' })
        }
    }

    console.log('ModifyPet -> render')

    return <div className="p-4">
        <Title>MyPet</Title>

        <div className="flex justify-between">
            <h2 className="font-bold">Modify Pet</h2>

            <Anchor onClick={handleBackClick}>&lt; Back</Anchor>
        </div>

        {pet ? <Form onSubmit={handleModifyPetSubmit}>
            <Field alias="name" type="text" defaultValue={pet.name}>Name</Field>

            <Field alias="birthdate" type="date" defaultValue={pet.birthdate}>Birthdate</Field>

            <Field alias="weight" type="number" defaultValue={pet.weight}>Weight (kg)</Field>

            <Field alias="image" type="url" defaultValue={pet.image}>Image</Field>

            <ButtonSecondary className="self-center mt-4" type="submit">Modify Pet</ButtonSecondary>
        </Form> : <Spinner/>}

        {feedback && <Feedback feedback={feedback} />}
    </div>
}   // usamos la propiedad defaultValue para traernos los datos
