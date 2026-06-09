import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import api from '../api/axios'
import type { Flashcard } from '../components/Flashcard'
import type { Deck } from '../components/DeckItem'
import Spinner from '../components/Spinner'
import ErrorToast from '../components/Errortoast'
import FlipCard from '../components/FlipCard'

export default function DeckLearn() {
	const { id: deckId } = useParams<{ id: string }>()
	const [deck, setDeck] = useState<Deck | null>(null)
	const [flashcards, setFlashcards] = useState<Flashcard[]>([])
	const [errorMsg, setErrorMsg] = useState<string | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await api.get(`/decks/${deckId}`)
				setDeck(res.data)
				setFlashcards(res.data.flashcards)
			} catch {
				setErrorMsg('Nie udało się pobrać talii.')
			}
		}
		if (deckId) fetchData()
	}, [deckId])

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

			{/* Header */}
			<div className='bg-white border-b border-gray-100 px-6 py-4'>
				<div className='max-w-7xl mx-auto flex flex-row justify-between items-center'>
					<h2 className='font-semibold text-xl text-gray-800 leading-tight'>{deck.name}</h2>
					<Link
						to={`/deck/${deck._id}`}
						className='inline-flex items-center cursor-pointer px-4 py-3 bg-[#9ce4ff] border border-transparent rounded-xl font-semibold text-xs md:text-sm text-white uppercase tracking-widest hover:bg-[#83bfd5] focus:bg-gray-700 active:bg-[#83bfd5] focus:outline-none focus:ring-2 focus:ring-[#9ce4ff] focus:ring-offset-2 transition ease-in-out duration-150'>
						<ArrowLeft
							className='size-5'
							strokeWidth={1.5}
						/>
						<span>Powrót</span>
					</Link>
				</div>
			</div>

			{/* Cards */}
			<div className='py-12 flex flex-col justify-center items-center'>
				{flashcards.map(card => (
					<FlipCard
						key={card._id}
						card={card}
					/>
				))}
			</div>
		</div>
	)
}
