import { Anchor } from './components/commons/Anchor'
import { Title } from './components/commons/Title'

export function Landing({ onGoToLogin, onGoToRegister }) {   // con onGoToLogin y ToRegister se maneja desde la Landing a que vista ir
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

    return <div className="flex flex-col items-center justify-center p-20">
        <Title>MyPet</Title>
        <p className='font-bold text-2xl p-4'>Welcome!</p>

        <nav className='flex justify-between gap-2 items-end'>
           <Anchor onClick={handleLoginClick}>Login</Anchor> or <Anchor onClick={handleRegisterClick}>Register</Anchor>
        </nav>
    </div>
}
