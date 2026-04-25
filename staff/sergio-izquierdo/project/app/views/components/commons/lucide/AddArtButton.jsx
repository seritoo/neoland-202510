import { FilePlusCorner } from "lucide-react"

export function AddArtButton({ onClick }) {
	return <button onClick={onClick} className='bg-transparent'>
		<FilePlusCorner color="#3F295F" />
	</button>
}
