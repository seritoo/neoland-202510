export function Header({ children, title, isLanding = false, className, ...props }) {
	return <header className={`flex flex-col items-center w-full ${className}`} {...props} >
		{isLanding ? (
			<h1 className="font-['Italianno'] font-bold text-[#3F295F] text-6xl w-full mr-5 block mb-5 ">
				AppassionArte
			</h1>) : (
			<>
				<span  className="flex justify-start w-full font-['Italianno'] font-bold text-[#3F295F] text-3xl mb-2 px-3 bg-[#E5D6D6] pt-5">
					AppasionArte
				</span>
				<h1 className="font-['Inknut_Antiqua'] font-bold text-[#3F295F] text-2xl">
					{title}
				</h1>
			</>
		)}
		{children}
	</header>
}
