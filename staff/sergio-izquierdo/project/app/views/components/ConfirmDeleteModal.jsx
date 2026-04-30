import { CheckConfirmButton } from './commons/lucide/CheckConfirmButton'
import { CancelConfirmButton } from './commons/lucide/CancelConfirmButton'

export function ConfirmDeleteModal({ message, onConfirm, onCancel }) {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
			<div className="bg-[#f3f4f6] p-6 rounded-2xl shadow-xl max-w-sm w-full mx-4 flex flex-col items-center">
				<p className="font-['Inknut_Antiqua'] text-[#3F295F] text-center mb-6 text-sm">
					{message}
				</p>

				<div className="flex gap-8">
						<CancelConfirmButton onClick={onCancel} className="p-2 rounded-full hover:bg-gray-200 transition-colors"/>

						<CheckConfirmButton onClick={onConfirm} className="p-2 rounded-full hover:bg-gray-200 transition-colors"/>
				</div>
			</div>
		</div>
	)
}
