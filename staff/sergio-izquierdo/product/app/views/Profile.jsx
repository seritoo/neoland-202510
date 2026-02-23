import { useState } from 'react'

import { Anchor } from './components/commons/Anchor'
import { Title } from './components/commons/Title'
import { ChangeUserEmail } from './components/ChangeUserEmail'
import { ChangeUserPassword } from './components/ChangeUserPassword'
import { ChangeUserImage } from './components/ChangeUserImage'

export function Profile({ onGoToHome }) {
    console.log('Profile -> call')

    const [view, setView] = useState(null)

    const handleBackClick = event => {
        event.preventDefault()

        onGoToHome()
    }

    const handleChangeEmailClick = event => {
        event.preventDefault()

        setView('change-email')
    }

    const handlePasswordClick = event => {
        event.preventDefault()

        setView('change-password')
    }
    const handleImageClick = event => {
        event.preventDefault()

        setView('change-image')
    }

    console.log('Profile -> render')

    return <div className="p-4">
            <Title>MyPet</Title>

            <div>
                <h2 className="flex justify-center font-bold text-xl p-2">Profile:</h2>

                <Anchor className="flex justify-end p-4" onClick={handleBackClick}>&lt; Back</Anchor>
            </div>

            <ul>
                <li><Anchor onClick={handleChangeEmailClick}>Change e-mail</Anchor></li>
                <li><Anchor onClick={handlePasswordClick}>Change password</Anchor></li>
                <li><Anchor onClick={handleImageClick}>Change image</Anchor></li>
            </ul>

            {view === 'change-email' && <ChangeUserEmail />}

            {view === 'change-password' && <ChangeUserPassword />}

            {view === 'change-image' && <ChangeUserImage />}
        </div>
}
