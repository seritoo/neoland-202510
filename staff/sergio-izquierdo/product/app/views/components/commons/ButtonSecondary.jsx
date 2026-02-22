export function ButtonSecondary({ children, className, onClick, ...props }) {
  return (<button className={`bg-[#E5989B] text-black px-2  rounded ${className}`} onClick={onClick}{...props}> {children} </button>);
}
