const root = ReactDOM.createRoot(document.getElementById('root')) // punto de conexión del virtual DOM que lo transforma en DOM real

root.render(<App />)

const useState = React.useState

function App() {
	const displayState = useState('0')
	const displayValue = displayState[0]
	const setDisplayValue = displayState[1]

	const handleOneClicked = () => setDisplayValue('1')




	return <div className="border-2 m-2 p-2 rounded-2xl bg-gray-800 text-white">
		<div className="flex justify-end px-4 text-3xl">0</div>

		<div className="p-2 flex flex-col gap-2">
			<div className="flex justify-between">
				<div className="bg-gray-400 rounded-full w-10 h-8 flex justify-center items-center cursor-pointer">⌫</div>
				<div className="bg-gray-400 rounded-full w-10 h-8 flex justify-center items-center cursor-pointer">AC</div>
				<div className="bg-gray-400 rounded-full w-10 h-8 flex justify-center items-center cursor-pointer">%</div>
				<div className="rounded-full w-10 h-8 flex justify-center items-center cursor-pointer bg-orange-500">÷</div>
			</div>
			<div className="flex justify-between">
				<div className="bg-gray-600 rounded-full w-10 h-8 flex justify-center items-center cursor-pointer">7</div>
				<div className="bg-gray-600 rounded-full w-10 h-8 flex justify-center items-center cursor-pointer">8</div>
				<div className="bg-gray-600 rounded-full w-10 h-8 flex justify-center items-center cursor-pointer">9</div>
				<div className="rounded-full w-10 h-8 flex justify-center items-center cursor-pointer bg-orange-500">×</div>
			</div>
			<div className="flex justify-between">
				<div className="bg-gray-600 rounded-full w-10 h-8 flex justify-center items-center cursor-pointer">4</div>
				<div className="bg-gray-600 rounded-full w-10 h-8 flex justify-center items-center cursor-pointer">5</div>
				<div className="bg-gray-600 rounded-full w-10 h-8 flex justify-center items-center cursor-pointer">6</div>
				<div className="rounded-full w-10 h-8 flex justify-center items-center cursor-pointer bg-orange-500">-</div>
			</div>
			<div className="flex justify-between">
				<div className="bg-gray-600 rounded-full w-10 h-8 flex justify-center items-center cursor-pointer" onClick={handleOneClicked}>1</div>
				<div className="bg-gray-600 rounded-full w-10 h-8 flex justify-center items-center cursor-pointer">2</div>
				<div className="bg-gray-600 rounded-full w-10 h-8 flex justify-center items-center cursor-pointer">3</div>
				<div className="rounded-full w-10 h-8 flex justify-center items-center cursor-pointer bg-orange-500">+</div>
			</div>
			<div className="flex justify-between">
				<div className="bg-gray-600 rounded-full w-10 h-8 flex justify-center items-center cursor-pointer">+/-</div>
				<div className="bg-gray-600 rounded-full w-10 h-8 flex justify-center items-center cursor-pointer">0</div>
				<div className="bg-gray-600 rounded-full w-10 h-8 flex justify-center items-center cursor-pointer">,</div>
				<div className="rounded-full w-10 h-8 flex justify-center items-center cursor-pointer bg-orange-500">=</div>
			</div>
		</div>

	</div>
}
