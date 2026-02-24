import { useState, useEffect } from 'react'

import { Feedback } from './commons/Feedback'
import { ButtonSecondary } from './commons/ButtonSecondary'

import { logic } from '../../logic'

export function PetList({ onGoToPetDetail }) {
    console.log('PetList -> call')

    const [feedback, setFeedback] = useState(null)
    const [pets, setPets] = useState([])
    const [petId, setPetId] = useState(null)

    useEffect(() => {
        console.log('Home -> useEffect')

        try {
            logic.getPets()
                .then((pets) => { // recibe pets como parámetro porque este then recive lo que retorna el callback anterior (api)

                    setPets(pets)
                })
                .catch(error => setFeedback({ message: error.message, level: 'error' }))
        } catch (error) {
            setFeedback({ message: error.message, level: 'error' })
        }
    }, [])

    const handleRemovePetClick = petId => setPetId(petId)


    const handleCancelRemovePetClick = event => {
        event.preventDefault()

        setPetId(null)
    }

    const handleConfirmRemovePetClick = event => {
        event.preventDefault()
        try {
            logic.removePet(petId)
                .then(() => {
                    return logic.getPets()
                })
                .then(pets => {
                    setPetId(null) // borra el pet
                    setPets(pets) // actualiza los pets
                })
                .catch(error => setFeedback({ message: error.message, level: 'error' }))
        } catch (error) {
            setFeedback({ message: error.message, level: 'error' })
        }
    }

    const handleGoToPetDetailClick = petId => onGoToPetDetail(petId)

    console.log('PetList -> render')

    return <div>
        <ul className='flex flex-col gap-2 mt-2'>
            {pets.map(pet =>
                 <li className="flex items-center border-3 bg-[#C7EFC0] border-[#4C9A2A] p-2 justify-between" onClick={() => handleGoToPetDetailClick(pet.id)}>
                <div className="flex items-center gap-4">
                    <img src={pet.image} className="rounded-full w-15 h-15 object-cover" />

                    <p>{pet.name}</p>
                </div>

                <ButtonSecondary onClick={event => {
                    event.stopPropagation()

                    handleRemovePetClick(pet.id)}
                    }>🗑️</ButtonSecondary>
            </li>)}
        </ul>

        {petId && <div className="w-full h-full fixed top-0 left-0 bg-black/75 flex justify-center items-center">
            <div className="bg-white border-black border-2 p-2">
                <p className="font-bold text-center">Delete Pet?</p>

                <div className="flex justify-center gap-2">
                    <ButtonSecondary onClick={handleCancelRemovePetClick}>❌</ButtonSecondary>
                    <ButtonSecondary onClick={handleConfirmRemovePetClick}>✅</ButtonSecondary>
                </div>
            </div>
        </div>}

        {feedback && <Feedback feedback={feedback} />}    </div>
}
