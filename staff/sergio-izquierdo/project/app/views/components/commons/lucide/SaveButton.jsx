import { FileCheck } from 'lucide-react'

export function SaveButton({onClick}) {
	return <button onClick={onClick}  type='button' className='bg-transparent'>
		<FileCheck color="#16A34A" />
	</button>
}
