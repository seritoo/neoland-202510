export function Button({ children, type, className, onClick, id, ...props }) {
	return <button id={id} className={`bg-[#E94E77] text-white py-2 px-6 rounded ${className}`} type={type} onClick={onClick} {...props}>
		{children}
	</button>
}
