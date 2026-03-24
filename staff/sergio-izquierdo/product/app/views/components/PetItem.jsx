
import { ButtonSecondary } from './commons/ButtonSecondary'

import { logger } from '../../logger'


export function PetItem({ pet, onGoToPetDetail, onRemovePetClick }) {
	logger.debug('PetItem -> call')

	const handleGoToPetDetailClick = petId => onGoToPetDetail(petId)

	const handleRemovePetClick = petId => onRemovePetClick(petId)

	logger.debug('PetItem -> render')

	return <li key={pet.id} className="flex items-center border-2 border-black p-2 justify-between" onClick={() => handleGoToPetDetailClick(pet.id)}>
		<div className="flex items-center gap-4">
			<img src={pet.image} className="rounded-full w-15 h-15 object-cover" />

			<p>{pet.name}</p>
		</div>

		<ButtonSecondary onClick={event => {
			event.stopPropagation()

			handleRemovePetClick(pet.id)
		}
		}>🗑️</ButtonSecondary>
	</li>
}
