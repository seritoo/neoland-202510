import { useState, useEffect } from 'react'

import { useParams } from 'react-router'

import { Anchor } from './components/commons/Anchor'
import { Feedback } from './components/commons/Feedback'
import { ButtonSecondary } from './components/commons/ButtonSecondary'
import { Title } from './components/commons/Title'

import { logic } from '../logic'

export function PetDetail({ onGoToHome, onGoToModifyPet }) {
    console.log('PetDetail -> call')

    const [feedback, setFeedback] = useState(null)
    const [pet, setPet] = useState(null)

    const { petId } = useParams()

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

    const handleGoToModifyPet = () => onGoToModifyPet(petId)

    console.log('PetDetail -> render')

    return <div className="p-4">
        <Title>MyPet</Title>

        <div className="flex justify-end p-4">
            {/*<h2 className="font-bold text-2xl text-[#D07F82] p-10">Pet:</h2>*/}
            <Anchor onClick={handleBackClick}>&lt; Back</Anchor>
        </div>

        {pet && <div className="flex flex-col items-center border-3 border-[#4C9A2A] bg-[#C7EFC0] p-4">
            <img src={pet.image} className="rounded-full w-40 h-40 object-cover border-3 border-[#4C9A2A]" />

            <p>{pet.name}</p>

            <p>{pet.weight}Kg</p>

            <p>{pet.birthdate}</p>
        </div>}

         <div className="p-4 flex justify-center"><ButtonSecondary onClick={handleGoToModifyPet}>Modify Pet</ButtonSecondary></div>
        {feedback && <Feedback feedback={feedback} />}
    </div>
}
