export function ArtButton ({children, type, className, onClick, id, ...props}) {
	return <button id={id} className={`bg-[#9E78CC] text-[#063778] text-xl p-2 ${className}`} type={type} onClick={onClick} {...props}>{children}</button>
}
