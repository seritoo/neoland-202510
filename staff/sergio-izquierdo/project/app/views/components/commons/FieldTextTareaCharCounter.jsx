export function FieldTextTareaCharCounter({ label, name, value, onChange, maxLength, className }) {
	return (
		<div className={`flex flex-col w-full`}>
			{label && <label className="font-['Inknut_Antiqua'] text-[#3F295F]">{label}</label>}

			<textarea
				name={name}
				value={value}
				onChange={onChange}
				maxLength={maxLength}
				className={`w-full min-h-60 focus:outline-none focus:ring-2 resize-none ${className}`}
			/>

			<span className={`text-[10px] self-end mt-1 font-['Inknut_Antiqua']
                ${value.length >= maxLength ? 'text-red-500' : 'opacity-50'}`}>
				{value.length} / {maxLength}
			</span>
		</div>
	)
}
