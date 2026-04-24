import { HouseHeart } from 'lucide-react'

export function BackArtistHomeButton({onClick}) {
	return <button onClick={onClick} className="bg-[#E94E77] text-white p-3 rounded shadow-md">
		<HouseHeart color="#3F295F" />
	</button>
}
