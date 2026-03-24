import { useState, useEffect } from 'react'

import { ButtonSecondary } from './commons/ButtonSecondary'

import { PetItem } from './PetItem'

import { useContext } from '../../context'

import { logic } from '../../logic'

import { logger } from '../../logger'




export function PetList({ onGoToPetDetail }) {
    logger.debug('PetList -> call')

    const { onError } = useContext()

    const [pets, setPets] = useState([])
    const [petId, setPetId] = useState(null)

    useEffect(() => {
        logger.debug('Home -> useEffect')

        try {
            logic.getPets()
                .then((pets) => { // recibe pets como parámetro porque este then recive lo que retorna el callback anterior (api)
                    setPets(pets)
                })
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
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
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }

    logger.debug('PetList -> render')

    return <div>
        <ul className='flex flex-col gap-2 mt-2'>
            {pets.map(pet => <PetItem key={pet.id} pet={pet} onGoToPetDetail={onGoToPetDetail} onRemovePetClick={handleRemovePetClick} />)}
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
    </div>
}
