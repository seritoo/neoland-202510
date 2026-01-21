function Button({children, type, className, onClick}) {
	return <a className={`cursor-pointer underline font-bold ${className}`} type={type} onClick={onClick}>{children}</a>
}
