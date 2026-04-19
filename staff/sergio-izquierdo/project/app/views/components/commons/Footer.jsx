export function Footer({children, className, onClick, id, ...props}) {
	return <footer id={id} className={`mt-auto w-full px-5 ${className} `} onClick={onClick} {...props} >
			<nav className="flex justify-between w-full">
				{children}
			</nav>
		</footer>
}
