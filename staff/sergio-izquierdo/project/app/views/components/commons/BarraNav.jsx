export function BarraNav({ children, className }) {
	return <nav className={`flex justify-between w-full nav-gradient-artist h-10 px-10 mt-5 ${className}`}>
		{children}
	</nav>
}
