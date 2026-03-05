import { useState, useEffect } from 'react'

import { Anchor } from './components/commons/Anchor'
import { Button } from './components/commons/Button'
import { Title } from './components/commons/Title'

import { PetList } from './components/PetList'

import { logic } from '../logic'

export function Home({ onGoToAddPet, onUserLoggedOut, onGoToProfile, onGoToPetDetail, onError }) {
    console.log('Home -> call')

     const [name, setName] = useState(null)
     const [image, setImage] = useState('https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ZHc1YzJkenBiZGZrYnZkbzZrc3d1a29jaWNvbHRpd2diN3Y3NmF0NCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xdH0MjQ83lGFVv7gjR/giphy.gif')

     useEffect(() => {
        console.log('Home -> useEffect')
        try {
            logic.getLoggedInUser()
            .then(user => {
                setName(user.name)
                setImage(user.image || image )
            })
            .catch(error => onError(error))
        } catch (error) {
           onError(error)
        }
     }, [])

    const handleAddPetClick = event => {
        event.preventDefault()

        onGoToAddPet()
    }

    const handleLogoutClick = event => {
        event.preventDefault()

        try {
            logic.logoutUser()

            onUserLoggedOut()
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

         <h2 className="flex justify-center font-bold text-xl p-5 ">Welcome Home, {name || 'friend'}! <img className='rounded-full w-15 h-15 object-cover p-2' src={image} /></h2>

        <div className="flex justify-between">
            <Anchor onClick={handleAddPetClick}>+ Pet</Anchor>

            <Anchor onClick={handleProfileClick}>Profile</Anchor>
        </div>

        <PetList onGoToPetDetail={handleGoToPetDetail}/>

         <div className="p-4 flex justify-center"><Button type="button" onClick={handleLogoutClick}>Logout</Button></div>
    </div>
}
