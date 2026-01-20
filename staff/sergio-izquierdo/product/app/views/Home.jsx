const { useState } = React

function Home({ onGoToAddPet, onGoToLogin }) {
    console.log('Home -> call')

    const [message, setMessage] = useState('')

    const handleAddPetClick = event => {
        event.preventDefault()

        onGoToAddPet()
    }

    const handleLogoutClick = event => {
        event.preventDefault()

        try {
            logic.logoutUser()

            setMessage('')
            setPets([])

            onGoToLogin()
        } catch (error) {
            setMessage('sorry, there was an error on logout, please, try it later')
        }
    }

    console.log('Home -> render')

    return <div className="p-4">
        <h1 className="font-bold text-xl">MyPet</h1>

        <h2 className="font-bold">Welcome Home!</h2>

        <div className="flex justify-between">
            <Button className="bg-black text-white px-1" type="button" onClick={handleAddPetClick}>+ Pet</Button>
            <Button className="bg-black text-white px-1" type="button" onClick={handleLogoutClick}>Logout</Button>
        </div>

       <PetsList />

        <p>{message}</p>
    </div>
}
