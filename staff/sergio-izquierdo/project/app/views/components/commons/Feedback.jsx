export function Feedback({ feedback }) {
	return (
		<p className={`text-center text-white bg-gray-500 text-sm py-2 fixed top-0 left-0 w-full z-100
		${feedback.level === 'success' ? 'bg-green-600 font-bold'
				:
				feedback.level === 'warn' ?
					'bg-yellow-500 font-bold'
					:
					feedback.level === 'danger' ?
						'bg-orange-600 font-bold'
						:
						feedback.level === 'error' ?
							'bg-red-500 font-bold'
							: ''
			}`}>{feedback.message}
		</p>
	)
}
