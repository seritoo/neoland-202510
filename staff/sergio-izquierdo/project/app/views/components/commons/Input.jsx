export function Input({ alias, autoComplete, type, className, defaultValue, value, onChange, placeholder }) {
    return <input id={alias} name={alias} autoComplete={autoComplete || alias} type={type} className={`border w-full h-8 px-2 ${className}`} defaultValue={defaultValue} value={value} onChange={onChange} placeholder={placeholder}/>
}
