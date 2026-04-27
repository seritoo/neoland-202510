import { FileInput } from 'lucide-react'

export function StoryDetailButton({ onClick }) {
	return <button onClick={onClick} type='button' className='bg-transparent flex justify-end'>
		<FileInput color="#E94E77" />
	</button>
}
