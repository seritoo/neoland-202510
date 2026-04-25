import { House } from 'lucide-react'

export function LandingButton({onClick}) {
	return <button onClick={onClick} className='bg-transparent'>
		<House color="#3F295F" />
	</button>
}
