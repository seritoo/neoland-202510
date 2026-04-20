import { useState, useEffect } from 'react'

import { Layout } from './components/commons/Layout'
import { Header } from './components/commons/Header'
import { Button } from './components/commons/Button'
import { ArtButton } from './components/ArtButton'
import { Footer } from './components/commons/Footer'
import { Anchor } from './components/commons/Anchor'

import { useContext } from '../context'

import { logic} from '../logic'

import {logger} from '../logger'





export function ArtistHome({ onUserLoggedOut, onGoToProfile, onGoToAddArt, onGoToShortStories }) {
	logger.debug('ArtistHome -> call')

	const { onError } = useContext()

	const [image, setImage] = useState (null)

	useEffect(() => {
		logger.debug('ArtistHome -> useEffect')
		try {
			logic.getLoggedInUser()
				.then(user => {
					setImage(user.image || image)
				})
				.catch(error => onError(error))
		} catch (error) {
			onError(error)
		}
	}, [])



	return <Layout>
		<Header title='Hi, Artist!'>
			<div>
				<img className='rounded-full w-15 h-15 object-cover p-2' src={image} />
			</div>
		</Header>

		<main className='flex flex-col items-center mt-10 w-full gap-5'>
			<nav className='flex gap-4'>
				<Button className="w-36 py-2">+ Art</Button>

				<Button className="w-36 py-2">Profile</Button>
			</nav>

			<div className="w-full flex justify-center">
				<ArtButton>
					Short Stories
				</ArtButton>
			</div>

			<section className='bg-red-500'>
				<p>Under construction, no stories yet...</p>
			</section>
		</main>

		<Footer>
			<button className="bg-violet-400 p-2 rounded-full text-['inknut antiqua'] text-[#3F295F]">Logout</button>
		</Footer>
	</Layout>
}
