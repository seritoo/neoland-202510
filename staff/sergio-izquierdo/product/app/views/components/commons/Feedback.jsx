export function Feedback ({feedback}) {
	return <p className={`text-center ${feedback.level === 'success' ? 'text-green-800 font-bold' : feedback.level === 'error' ? 'text-red-600 font-bold' : ''}`}>{feedback.message}</p>
}
