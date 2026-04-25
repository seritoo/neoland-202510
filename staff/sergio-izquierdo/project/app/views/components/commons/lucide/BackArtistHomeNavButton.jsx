import { HouseHeart } from 'lucide-react'

export function BackArtistHomeNavButton({onClick}) {
	return <button onClick={onClick} className="bg-transparent">
		<HouseHeart color="#3F295F" />
	</button>
}
