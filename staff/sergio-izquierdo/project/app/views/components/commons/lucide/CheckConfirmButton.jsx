import { Check } from 'lucide-react'

export function CheckConfirmButton({onClick}) {
	return <button  onClick={onClick} type='button' bg-transparent>
		<Check size={28} color="#16A34A" />
	</button>
}
