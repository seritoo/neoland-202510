export function ButtonSecondary({ children, className, onClick, ...props }) {
  return (<button className={`bg-[#E5989B] border-2 border-[#4C9A2A] text-black p-2  rounded ${className}`} onClick={onClick}{...props}> {children} </button>)
}
