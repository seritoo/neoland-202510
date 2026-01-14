const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<App />)

const useState = React.useState

function App() {
	const [view, setView] = useState('landing')
	const [message, setMessage] = useState('')
	const [passwordType, setPasswordType] = useState('password')
	const [passwordRepeatType, setPasswordRepeatType] = useState('password')

	const handleLoginClick = event => {
		event.preventDefault()

		setView('login')
	}

	const handleRegisterClick = event => {
		event.preventDefault()

		setView('register')
	}

	const handleLoginSubmit = event => {
		event.preventDefault()

		const form = event.target

		const username = form.username.value
		const password = form.password.value

		try {
			logic.loginUser(username, password)

			form.reset()

			setView('home')
			setMessage('')
		} catch(error) {
			setMessage(error.message)
		}
	}

	const handleRegisterSubmit = event => {
		event.preventDefault()

		const form = event.target

		const name = form.name.value
		const email = form.email.value
		const username = form.username.value
		const password = form.password.value
		const passwordRepeat = form.passwordRepeat.value

		try {
			logic.registerUser(name, email, username, password, passwordRepeat)

			form. reset
			setView('login')
			setMessage('')
		} catch(error) {
			setMessage(error.message)
		}
	}

	const handleTogglePaswordClick = event => {
		event.preventDefault()

		setPasswordType(passwordType === 'password' ? 'text' : 'password')

	}

	const handleTogglePaswordRepeatClick = event => {
		event.preventDefault()

		setPasswordRepeatType(passwordRepeatType === 'password' ? 'text' : 'password')
	}

	//landing
	if(view === 'landing')
		return <div className="p-4">
			<h1 className="font-bold text-3xl alaign-middle">MyPet</h1>
			<p className="text-xl text">Welcome!</p>

			<nav>
				<a className="cursor-pointer underline text-blue-800 font-bold" onClick={handleLoginClick}>Login</a> or <a className="cursor-pointer underline text-blue-800 font-bold" onClick={handleRegisterClick}>Register</a>
			</nav>
		</div>
	//login
	if(view === 'login')
		return <div className="p-4">
		<h1 className="font-bold text-3xl alaign-middle">MyPet</h1>
		<h2 className="font-bold">Login</h2>

		<form className="flex flex-col" onSubmit={handleLoginSubmit}>
			<label htmlFor="username">Username</label>
			<input id="username" className="border px-1" />

			<label htmlFor="password">Password</label>
			<input className={passwordType === 'password' ? "border px-1" : "border px-1 bg-yellow-300"} id="password" type={passwordType} />
			<button className="bg-black text-white px-2 self-end" type="button" onClick={handleTogglePaswordClick}>{passwordType === 'password' ? 'Show' : 'Hide'}</button>

			<button className="bg-black text-white px-2 self-center" type="submit">Login</button>
			</form>

			<a className="cursor-pointer underline text-blue-800 font-bold" onClick={handleRegisterClick} >Register</a>

			<p>{message}</p>
	</div>

	//register
	if (view === 'register')
		return <div className="p-4">
			<h1 className="font-bold text-3xl alaign-middle">Mypet</h1>
			<h2 className="font-bold">Register</h2>

			<form className="flex flex-col" onSubmit={handleRegisterSubmit} >
				<label htmlFor="name">Name</label>
				<input id="name" type="text" className="border px-1" />

				<label htmlFor="email">Email</label>
				<input id="email" type="email" className="border px-1" />

				<label htmlFor="username">Username</label>
				<input id="username" type="text" className="border px-1" />

				<label htmlFor="password">Password</label>
				<input id="password" type={passwordType} className={passwordType === 'password' ? "border px-1" : "border px-1 bg-yellow-300"}/>
				<button className="bg-black text-white px-2 self-end" type="button" onClick={handleTogglePaswordClick}>{passwordType === 'password' ? 'Show' : 'Hide'}</button>

				<label htmlFor="passwordRepeat">Repeat Password</label>
				<input id="passwordRepeat" type={passwordRepeatType} className={passwordRepeatType === 'password' ? "border px-1" : "border px-1 bg-yellow-300"}/>
				<button className="bg-black text-white px-2 self-end" type="button" onClick={handleTogglePaswordRepeatClick}>{passwordRepeatType === 'password' ? 'Show' : 'Hide'}</button>

				<button className="bg-black text-white px-2 self-center" type="submit">Register</button>
			</form>

			<a className="cursor-pointer underline text-blue-800 font-bold" onClick={handleLoginClick}>Login</a>

			<p>{message}</p>
		</div>

		//home
		if (view === 'home')
			return <div className="p-4">
				<h1 className="font-bold text-3xl alaign-middle">MyPet</h1>

				<h2 className="font-bold">Welcome Home!</h2>

				<div className="flex justify-between">
					<button className="bg-black text-white px-2" type="button">+ Pet</button>
					<button className="bg-black text-white px-2" type="button">Logout</button>
				</div>

				<ul className="flex flex-col gap-2 mt-2"></ul>

				<div className="w-full h-full fixed top-0 left-0 bg-black/75 flex justify-center items-center" style={{ display: 'none' }}>
					<div className="bg-white border-black border-2 p-2">
						<p className="text-center">Delete Pet?</p>
						<div className="flex justify-center gap-2">
							<button className="bg-black text-white px-2">❌</button>
							<button className="bg-black text-white px-2">✅</button>
						</div>
					</div>
				</div>

				<p></p>
			</div>

		//Add-pet
		if(view === 'add-pet')
			return <div className="p-4">
				<h1 className="font-bold text-3xl alaign-middle">MyPet</h1>

				<div className="flex justify-between">
					<h2 className="font-bold">Add Pet</h2>
					<a className="cursor-pointer underline text-blue-800 font-bold">&lt; Back</a>
				</div>

				<form className="flex flex-col">
					<label htmlFor="name">Name</label>
					<input id="name" type="text" className="border px-1" />

					<label htmlFor="date">Date of Birth</label>
					<input id="date" type="date" className="border px-1" />

					<label htmlFor="weight">Weight (kg)</label>
					<input id="weight" type="number" step="0.01" className="border px-1" />

					<label htmlFor="image">Image</label>
					<input id="image" type="url" className="border  px-1" />

					<button className="bg-black text-white px-2 self-center mt-4" type="submit">AddPet</button>
				</form>

				<p></p>
			</div>
}
