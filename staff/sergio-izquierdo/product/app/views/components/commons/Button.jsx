export function Button({children, type, className, onClick, id, ...props}) {
	return <button id={id} className={`bg-[#4C9A2A] text-white p-2 rounded ${className}`} type={type} onClick={onClick} {...props}>{children}</button>
}
