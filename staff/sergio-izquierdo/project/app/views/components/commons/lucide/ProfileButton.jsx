import { UserRoundPen } from 'lucide-react'

export function ProfileButton({onClick}) {
	return <button onClick={onClick} className='bg-transparent'>
		<UserRoundPen color='#3F295F' />
	</button>
}
