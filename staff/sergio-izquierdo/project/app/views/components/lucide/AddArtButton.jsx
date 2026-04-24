import { FilePenLine } from 'lucide-react'

export function AddArtButton({onClick}) {
	return <button onClick={onClick} className='bg-transparent'>
		<FilePenLine color="#3F295F" />
	</button>
}
