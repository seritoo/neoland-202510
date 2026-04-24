import { FilePlusCorner } from 'lucide-react'

export function StoryDetailButton({ onClick }) {
	return <button onClick={onClick} className='bg-transparent flex justify-end'>
		<FilePlusCorner color="#3F295F" />
	</button>
}
