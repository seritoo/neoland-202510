export function Button({children, type, className, onClick, id, ...props}) {
	return <button id={id} className={`bg-green-500 text-white p-2 rounded ${className}`} type={type} onClick={onClick} {...props}>{children}</button>
}
