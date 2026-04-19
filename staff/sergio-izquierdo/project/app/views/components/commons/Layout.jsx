export function Layout({children, className}) {
	return <div className={`flex flex-col items-center min-h-screen bg-[#E5D6D6] pt-10 pb-10 ${className}`}>
		{children}
	</div>
}
