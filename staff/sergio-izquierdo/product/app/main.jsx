const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<App />)

const {useState, useRef} = React


function App() {
	const [view, setView] = useState('landing')
	const [message, setMessage] = useState('')
	const [passwordType, setPasswordType] = useState('password')
	const [passwordRepeatType, setPasswordRepeatType] = useState('password')
	const [pets, setPets] = useState([])

	const loginFomrRef = useRef()
	const registerFormRef = useRef()

	const handleLoginClick = event => {
		event.preventDefault()

		if(registerFormRef.current)
			registerFormRef.current.reset()

		setView('login')
		setMessage('')
		setPasswordType('password')
		setPasswordRepeatType('password')
	}

	const handleRegisterClick = event => {
		event.preventDefault()

		if(loginFomrRef.current)
			loginFomrRef.current.reset()

		setView('register')
		setMessage('')
		setPasswordType('password')
		setPasswordRepeatType('password')
	}

	const handleLoginSubmit = event => {
		event.preventDefault()

		const form = event.target

		const username = form.username.value
		const password = form.password.value

		try {
			logic.loginUser(username, password)

			form.reset()

			const pets = logic.getPets()

			const newPets = []

			for(const pet of pets) {
				newPets.push(pet)
			}

			setView('home')
			setMessage('')
			setPasswordType('password')
			setPasswordRepeatType('password')
			setPets(newPets)
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

	const handleLogoutClick = event => {
		event.preventDefault()

		try{
			 logic.logoutUser()

			 setView('login')

		} catch(error){
			setMessage('sorry, there was an error on logout, please, try it later')

		}

	}

	const handleAddPetClick = event => {
		event.preventDefault()

		setView('add-pet')

	}

	const handleBackCklic = event => {
		event.preventDefault()

		setView('home')
	}
	 const handleAddpetSubmit = event => {
		event.preventDefault()

		const form = event.target // con esto me traigo el DOM real

		const name = form.name.value
		const birthdate = form.birthdate.value
		const weight = Number(form.weight.value)
		const image = form.image.value

		try{
			logic.addPet(name, birthdate, weight, image)

			form.reset()

			setView('home')


		} catch(error) {
			setMessage(error.message)
		}
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

		<form className="flex flex-col" onSubmit={handleLoginSubmit} ref={loginFomrRef}>
			<label htmlFor="username">Username</label>
			<input id="username" name="username" autoComplete="username" type="text" className="border px-1" />

			<label htmlFor="password">Password</label>
			<input className={passwordType === 'password' ? "border px-1" : "border px-1 bg-yellow-300"} id="password" name="password" autoComplete="off" type={passwordType} />
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

			<form className="flex flex-col" onSubmit={handleRegisterSubmit} ref={registerFormRef} >
				<label htmlFor="name">Name</label>
				<input id="name" name="name" autoComplete="name" type="text" className="border px-1" />

				<label htmlFor="email">Email</label>
				<input id="email" name="email" autoComplete="email" type="email" className="border px-1" />

				<label htmlFor="username">Username</label>
				<input id="username" name="username" autoComplete="username" type="text" className="border px-1" />

				<label htmlFor="password">Password</label>
				<input id="password" name="password" autoComplete="off" type={passwordType} className={passwordType === 'password' ? "border px-1" : "border px-1 bg-yellow-300"}/>
				<button className="bg-black text-white px-2 self-end" type="button" onClick={handleTogglePaswordClick}>{passwordType === 'password' ? 'Show' : 'Hide'}</button>

				<label htmlFor="passwordRepeat">Repeat Password</label>
				<input id="passwordRepeat" name="passwordRepeat" autoComplete="off" type={passwordRepeatType} className={passwordRepeatType === 'password' ? "border px-1" : "border px-1 bg-yellow-300"}/>
				<button className="bg-black text-white px-2 self-end" type="button" onClick={handleTogglePaswordRepeatClick}>{passwordRepeatType === 'password' ? 'Show' : 'Hide'}</button>

				<button className="bg-black text-white px-2 self-center" type="submit">Register</button>
			</form>

			<a className="cursor-pointer underline text-blue-800 font-bold" onClick={handleLoginClick}>Login</a>

			<p>{message}</p>
		</div>

		//home
		if (view === 'home') {
			const petItems = []

			for(const pet of pets) {
				const petItem = <li className="flex items center border-2 border-black p-2 justify-between">
					<div className="flex items center gap-4">
						<img src={pet.img} className="rounded-full w-10 h-10 object-cover"/>

						<p>{pet.name}</p>
					</div>
					<button className="bg-black text-white px-1 justify self-end">🗑️</button>
				</li>
				petItems.push(petItem)
			}


			return <div className="p-4">
				<h1 className="font-bold text-3xl alaign-middle">MyPet</h1>

				<h2 className="font-bold">Welcome Home!</h2>

				<div className="flex justify-between">
					<button className="bg-black text-white px-2" type="button" onClick={handleAddPetClick} >+ Pet</button>
					<button className="bg-black text-white px-2" type="button" onClick={handleLogoutClick}>Logout</button>
				</div>

				<ul className="flex flex-col gap-2 mt-2">
					{petItems}
				</ul>

				<div className="w-full h-full fixed top-0 left-0 bg-black/75 flex justify-center items-center" style={{ display: 'none' }}>
					<div className="bg-white border-black border-2 p-2">
						<p className="text-center">Delete Pet?</p>
						<div className="flex justify-center gap-2">
							<button className="bg-black text-white px-2">❌</button>
							<button className="bg-black text-white px-2">✅</button>
						</div>
					</div>
				</div>

				<p>{message}</p>
			</div>
		}

		//Add-pet
		if(view === 'add-pet')
			return <div className="p-4">
				<h1 className="font-bold text-3xl alaign-middle">MyPet</h1>

				<div className="flex justify-between">
					<h2 className="font-bold">Add Pet</h2>
					<a className="cursor-pointer underline text-blue-800 font-bold" onClick={handleBackCklic}>&lt; Back</a>
				</div>

				<form className="flex flex-col" onSubmit={handleAddpetSubmit}>
					<label htmlFor="name">Name</label>
					<input id="name" name="name" autoComplete="off" type="text" className="border px-1" />

					<label htmlFor="date">Date of Birth</label>
					<input id="birthdate" name="birthdate" autoComplete="off" type="date" className="border px-1" />

					<label htmlFor="weight">Weight (kg)</label>
					<input id="weight" name="weight" autoComplete="off" type="number" step="0.01" className="border px-1" />

					<label htmlFor="image">Image</label>
					<input id="image" name="image" autoComplete="off" type="url" className="border  px-1" />

					<button className="bg-black text-white px-2 self-center mt-4" type="submit" onClick="">AddPet</button>
				</form>

				<p>{message}</p>
			</div>
}
