import { FilePenLine } from 'lucide-react'

export function EditButton({onClick}) {
	return <button onClick={onClick} type='button' className='bg-transparent'>
		<FilePenLine color="#3F295F" />
	</button >
}
