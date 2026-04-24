export function Layout({children, className}) {
	return <div className={`flex flex-col items-center min-h-screen w-full bg-[#E5D6D6] ${className}`}>
		{children}
	</div>
}
