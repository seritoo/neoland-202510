export function Title({ children, className, ...props }) {
  return (
    <h1
      className={`text-4xl font-bold text-[#4C9A2A] ${className}`}
      {...props}
    >
      {children}
    </h1>
  )
}
