export function Paragraph ({children, className, ...props}) {
	return <p className={`font-['Inknut'] italic font text-[#7B58AA] text-2xl ${className} `}>{children}</p>
}
