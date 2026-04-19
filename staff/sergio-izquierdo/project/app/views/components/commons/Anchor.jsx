export function Anchor ({children, className, onClick}) {
	return <a className={`flex cursor-pointer underline font-['Inknut'] font-bold text-[#063778] text-xl ${className}`} href="" onClick={onClick}>{children}</a>
}
