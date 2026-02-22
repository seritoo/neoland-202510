import { useEffect, useState } from 'react'

import { Anchor } from './components/commons/Anchor'
import { Feedback } from './components/commons/Feedback'
import { ButtonSecondary } from './components/commons/ButtonSecondary'
import { Title } from './components/commons/Title'

import { logic } from '../logic'

export function PetDetail({ onGoToHome, petId, onGoToModifyPet }) {
    console.log('PetDetail -> call')

    const [feedback, setFeedback] = useState(null)
    const [pet, setPet] = useState(null)

    useEffect(() => {
        try {
            logic.getPet(petId)
                .then(pet => setPet(pet))
                .catch(error => setFeedback({ message: error.message, level: 'error' }))
        } catch (error) {
            setFeedback({ message: error.message, level: 'error' })
        }
    }, [])

    const handleBackClick = event => {
        event.preventDefault()

        onGoToHome()
    }

    const handleGoToModifyPet = () => onGoToModifyPet()

    console.log('PetDetail -> render')

    return <div className="p-4">
        <Title>MyPet</Title>

        <div className="flex justify-between">
            <h2 className="font-bold text-2xl p-10">Pet:</h2>
            <Anchor onClick={handleBackClick}>&lt; Back</Anchor>
        </div>

        {pet && <div className="flex flex-col items-center gap-4">
            <img src={pet.image} className="rounded-full w-40 h-40 object-cover" />

            <p>{pet.name}</p>

            <p>{pet.weight}Kg</p>

            <p>{pet.birthdate}</p>

            <ButtonSecondary onClick={handleGoToModifyPet}>Modify</ButtonSecondary>
        </div>}
        {feedback && <Feedback feedback={feedback} />}
    </div>
}
