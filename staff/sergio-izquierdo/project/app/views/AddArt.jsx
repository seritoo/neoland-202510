import { useState } from 'react'

import { Layout } from './components/commons/Layout'
import { Header } from './components/commons/Header'
import { Form } from './components/commons/Form'
import { Field } from './components/commons/Field'
import { Label } from './components/commons/Label'
import { Button } from './components/commons/Button'

import { useContext } from '../context'

import { logic } from '../logic'

import { logger } from '../logger'

export function AddArt({ onGoToArtistHome }) {
	logger.debug('AddArt -> call')

	const [charCount, setCharCount] = useState(0)
	const MAX_CHARS = 5000

	const { onError, onSuccess } = useContext()

	const handleBackClick = event => {
		event.preventDefault()

		onGoToArtistHome()
	}

	const handleShareArtSubmit = event => {
		event.preventDefault()

		const form = event.target

		const title = form.title.value
		const shortStory = form.shortStory.value

		try {
			logic.createStory(title, shortStory)
				.then(() => {
					onSuccess('Short story published successfully!')

					onGoToArtistHome()
				})
		} catch (error) {
			onError(error)

		}

	}

	const handleCharCountChange = event => setCharCount(event.target.value.length)

	return <Layout>
		<Header title='Share your art!'>
			<div className='w-full px-6 flex'>
				<button onClick={handleBackClick} className="bg-violet-400 p-1 px-3 mt-4 ml-auto rounded-[10%] text-['inknut antiqua'] text-[#3F295F]">Back</button>
			</div>
		</Header>

		<Form onSubmit={handleShareArtSubmit}>
			<Field alias='title' type='text'>Title:</Field>
			<div className='flex flex-col w-full'>
				<Label className="font-['Inknut_Antiqua'] text-[#3F295F] mb-2">Short Story:</Label>
				<textarea
					name='shortStory'
					onChange={handleCharCountChange}
					maxLength={MAX_CHARS}
					className='w-full border border-black p-2 bg-white min-h-[150px] focus:outline-none'
				/>
				<span className={`text-[10px] self-end mt-1 font-['Inknut_Antiqua'] ${charCount >= MAX_CHARS ? 'text-red-500' : 'opacity-50'}`}>
					{charCount} / {MAX_CHARS} caracteres
				</span>
			</div>

			<Button type='submit' className='mt-10 self-center'>Share art!</Button>
		</Form>
	</Layout>
}
