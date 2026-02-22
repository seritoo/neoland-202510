export function Anchor ({children, className, onClick}) {
	return <a className={`cursor-pointer underline font-bold text-blue-800 text-xl ${className}`} href="" onClick={onClick}>{children}</a>
}
