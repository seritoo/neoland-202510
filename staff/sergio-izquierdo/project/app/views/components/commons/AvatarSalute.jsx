import { Avatar } from './Avatar'

export function AvatarSalute({ username, image }) {
	return <div className="flex justify-start items-center w-full gap-3 p-3 bg-[#E5D6D6] pb-5">
		<Avatar image={image} username={username}/>
		<h2 className="font-['Inknut_Antiqua'] text-[#3F295F] text-xl ">
			Hi, {username || 'Artist'}!
		</h2>
	</div>
}
