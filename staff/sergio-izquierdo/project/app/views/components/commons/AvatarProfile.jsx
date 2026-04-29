export function AvatarProfile({image, username, speciality, className}) {
	return <div className="flex flex-col items-center gap-4">
		<div className={`w-28 h-28 rounded-full border-2 border-[#7B58AA] overflow-hidden shadow-md ${className}`}>
			{image ? (
				<img src={image} alt={username} className='w-full h-full object-cover' />
			) : (
				<div className="w-full h-full bg-slate-200 flex items-center justify-center text-[#3F295F] opacity-30 text-xs text-center p-2">No image</div>
			)}
		</div>

		<div className="text-center">
			<h2 className="font-['Inknut_Antiqua'] italic text-[#7B58AA] text-2xl">
				{username}
			</h2>
			<p className="text-sm opacity-60 italic mt-1">{speciality}</p>
		</div>
	</div>
}
