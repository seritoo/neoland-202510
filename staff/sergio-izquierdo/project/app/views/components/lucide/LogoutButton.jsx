import { DoorOpen } from 'lucide-react'

export function LogoutButton({onClick}) {
	return <button onClick={onClick} className='bg-transparent'>
		<DoorOpen color="#3F295F" />
	</button>
}
