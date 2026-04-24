import { ArrowBigLeftDash } from 'lucide-react'

export function BackButton({onClick}) {
	return <button onClick={onClick} className='bg-transparent'>
		<ArrowBigLeftDash color="#3F295F" />
	</button>
}
