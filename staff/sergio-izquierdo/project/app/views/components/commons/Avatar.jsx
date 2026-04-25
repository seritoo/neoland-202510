export function Avatar( {image, username}) {
	return <div className="w-15 h-15 rounded-full border-2 border-[#3F295F] overflow-hidden shadow-md">
		{image ? (
			<img src={image} alt={username} className='w-full h-full object-cover' />
		) : (
			<div className="w-full h-full bg-slate-200 flex items-center justify-center text-[#3F295F] opacity-30 text-xs text-center p-2">No image</div>
		)}
	</div>
}
