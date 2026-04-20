export function Header({ children, title, isLanding = false, className, ...props }) {
	return <header className={`flex flex-col items-center w-full ${className}`} {...props} >
		{isLanding ? (
			<h1 className="font-['italianno'] font-bold text-[#3F295F] text-6xl w-full text-center block mb-10 ">
				AppassionArte
			</h1>) : (
			<>
				<span className="font-['Italianno'] font-bold text-[#3F295F] text-3xl mb-2">
					AppasionArte
				</span>
				<h1 className="font-['Inknut_Antiqua'] font-bold text-[#3F295F] text-2xl ">
					{title}
				</h1>
			</>
		)}
		{children}
	</header>
}
