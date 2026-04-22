export function Feedback({ feedback }) {
	return
	<p className={`text-center text-white text-sm py-2
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
}
