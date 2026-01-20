function Landing({ onGoToLogin, onGoToRegister }) {   // con onGoToLogin y ToRegister se maneja desde la Landing a que vista ir
    console.log('Landing -> call')

    const handleLoginClick = event => {   // manejamos el click abajo y una vez manejado usamos la prop onGoToLogin para ir a la view
        event.preventDefault()

        onGoToLogin()
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        onGoToRegister()
    }

    console.log('Landing -> render')

    return <div className="p-4">
        <h1 className="font-bold text-xl">MyPet</h1>
        <p>Welcome!</p>

        <nav>
            <a className="cursor-pointer underline font-bold" onClick={handleLoginClick}>Login</a> or <a className="cursor-pointer underline font-bold" onClick={handleRegisterClick}>Register</a>
        </nav>
    </div>
}
