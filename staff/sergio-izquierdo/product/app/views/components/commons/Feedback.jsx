export function Feedback ({feedback}) {
	return <p className={`text-center py-6 ${feedback.level === 'success' ? 'text-green-600 font-bold text-2xl' : feedback.level === 'error' ? 'text-red-600 font-bold text-2xl' : ''}`}>{feedback.message}</p>
}
