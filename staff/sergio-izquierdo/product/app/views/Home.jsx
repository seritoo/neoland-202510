import { useState, useEffect } from 'react'

import { Anchor } from './components/commons/Anchor'
import { ButtonSecondary } from './components/commons/ButtonSecondary'
import { Title } from './components/commons/Title'

import { Feedback} from './components/commons/Feedback'
import { Spinner } from './components/Spinner'

import { PetList } from './components/PetList'

import { logic } from '../logic'


export function Home({ onGoToAddPet, onGoToLogin, onGoToProfile, onGoToPetDetail }) {
    console.log('Home -> call')

     const [feedback, setFeedback] = useState(null)
     const [name, setName] = useState(null)
     const [image, setImage] = useState('https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ZHc1YzJkenBiZGZrYnZkbzZrc3d1a29jaWNvbHRpd2diN3Y3NmF0NCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xdH0MjQ83lGFVv7gjR/giphy.gif')

     useEffect(() => {
        setTimeout(() => {
        try {
            logic.getLoggedInUser()
            .then(user => {
                setName(user.name)
                setImage(user.image || image )
            })
            .catch(error => setFeedback({ message: error.message, level: 'error' }))

        } catch (error) {
            setFeedback({ message: error.message, level: 'error' })
        }
        }, 3000)
     }, [])

    const handleAddPetClick = event => {
        event.preventDefault()

        onGoToAddPet()
    }

    const handleLogoutClick = event => {
        event.preventDefault()

        try {
            logic.logoutUser()

            setFeedback(null)

            onGoToLogin()
        } catch (error) {
            setFeedback({ message: 'sorry! there was an error on logout. Please, try it later', level: 'error' })
        }
    }

    const handleProfileClick = event => {
        event.preventDefault()

        onGoToProfile()
    }

    const handleGoToPetDetail = petId => onGoToPetDetail(petId)

    console.log('Home -> render')

    return <div className="p-4">
        <Title>MyPet</Title>

    {name? <>
        <h2 className="flex justify-center font-bold text-xm p-5 ">Welcome Home, {name}! <img className='rounded-full w-15 h-15 object-cover p-2' src={image} /></h2>

        <div className="flex justify-between">
            <Anchor onClick={handleAddPetClick}>+ Pet</Anchor>

            <Anchor onClick={handleProfileClick}>Profile</Anchor>

            <ButtonSecondary type="button" onClick={handleLogoutClick}>Logout</ButtonSecondary>
        </div>

        <PetList onGoToPetDetail={handleGoToPetDetail}/>

        {feedback && <Feedback feedback={feedback} />}
    </> : <Spinner/>}

    </div>
}
