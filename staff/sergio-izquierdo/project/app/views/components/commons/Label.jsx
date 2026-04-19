export function Label({ alias, children }) {
    return  <label htmlFor={alias} className="font-bold text-[#3F295F] font-['Inknut_Antiqua']">{children}</label>
}
