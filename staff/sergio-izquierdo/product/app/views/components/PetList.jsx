import { useState, useEffect } from 'react'

import { Button } from './commons/Button'
import { Feedback } from './commons/Feedback'

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

    const handleremovePetClick = event => {
        event.preventDefault()
        event.stopPropagation()

        const button = event.target

        const petId = button.id

        setPetId(petId)
    }

    const handleCancelremovePetClick = event => {
        event.preventDefault()

        setPetId(null)
    }

    const handleConfirmremovePetClick = event => {
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

    const handleGoToPetDetailClick = event => {
        event.preventDefault()

        const li = event.currentTarget

        const petId = li.id

        onGoToPetDetail(petId)

    }

    console.log('PetList -> render')

    return <div>
        <ul className='flex flex-col gap-2 mt-2'>
            {pets.map(pet => <li id={pet.id} className="flex items-center border-2 border-black p-2 justify-between" onClick={handleGoToPetDetailClick}>
                <div className="flex items-center gap-4">
                    <img src={pet.image} className="rounded-full w-10 h-10 object-cover" />

                    <p>{pet.name}</p>
                </div>

                <Button id={pet.id} className="justify-self-end" onClick={handleremovePetClick}>🗑️</Button>
            </li>)}
        </ul>

        {petId && <div className="w-full h-full fixed top-0 left-0 bg-black/75 flex justify-center items-center">
            <div className="bg-white border-black border-2 p-2">
                <p className="text-center">Delete Pet?</p>

                <div className="flex justify-center gap-2">
                    <Button onClick={handleCancelremovePetClick}>❌</Button>
                    <Button onClick={handleConfirmremovePetClick}>✅</Button>
                </div>
            </div>
        </div>}

        {feedback && <Feedback feedback={feedback} />}    </div>
}
