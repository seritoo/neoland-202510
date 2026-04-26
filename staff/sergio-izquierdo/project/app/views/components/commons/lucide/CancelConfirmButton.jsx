import { X } from 'lucide-react'

export function CancelConfirmButton({ onClick }) {
	return <button onClick={onClick} type='button' bg-transparent>
		<X onClick={onClick} size={28} color="#ff0000" />
	</button>
}
