import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import FlipCard from '../components/FlipCard'
import type { Flashcard } from '../components/Flashcard'
import Spinner from '../components/Spinner'
import ErrorToast from '../components/Errortoast'

interface SharedDeck {
	name: string
	flashcards: Flashcard[]
}

export default function DeckPublic() {
	const { token } = useParams<{ token: string }>()
	const [deck, setDeck] = useState<SharedDeck | null>(null)
	const [errorMsg, setErrorMsg] = useState<string | null>(null)

	useEffect(() => {
		const fetchDeck = async () => {
			try {
				const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/decks/share/${token}`)
				setDeck(res.data)
			} catch {
				setErrorMsg('Nie udało się pobrać zestawu.')
			}
		}
		if (token) fetchDeck()
	}, [token])

	if (!deck)
		return (
			<div className='p-8 text-center'>
				<Spinner />
			</div>
		)

	return (
		<div>
			{errorMsg && (
				<ErrorToast
					message={errorMsg}
					onClose={() => setErrorMsg(null)}
				/>
			)}

			<div>
				<h1 className='text-2xl font-bold m-6 flex justify-center'>{deck.name}</h1>
			</div>

			<div className='py-12 flex flex-col justify-center items-center'>
				{deck.flashcards.map(card => (
					<FlipCard
						key={card._id}
						card={card}
					/>
				))}
			</div>
		</div>
	)
}
