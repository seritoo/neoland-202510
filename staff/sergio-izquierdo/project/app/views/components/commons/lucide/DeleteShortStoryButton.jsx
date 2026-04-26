import { Trash2 } from "lucide-react"

export function DeleteShortStoryButton({onClick}) {
	return <button onClick={onClick} type='button' className='bg-transparent'>
		<Trash2 color="#ff0000" />
	</button>
}
