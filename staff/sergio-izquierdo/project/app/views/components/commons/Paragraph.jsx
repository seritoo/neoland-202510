export function Paragraph ({children, className, ...props}) {
	return <p className={`font-['Inknut_Antiqua'] italic font text-[#7B58AA] text-2xl ml-10 mr-5 ${className} `}>{children}</p>
}
