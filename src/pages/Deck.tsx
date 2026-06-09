import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowRight, Clipboard, ClipboardCheck } from 'lucide-react'
import api from '../api/axios'
import FlashcardItem, { type Flashcard } from '../components/Flashcard'
import type { Deck } from '../components/DeckItem'
import Spinner from '../components/Spinner'
import Toast from '../components/Toast'
import ErrorToast from '../components/Errortoast'
import PrimaryButton from '../components/PrimaryButton'

export default function Deck() {
	const { id: deckId } = useParams<{ id: string }>()
	const [deck, setDeck] = useState<Deck | null>(null)
	const [flashcards, setFlashcards] = useState<Flashcard[]>([])
	const [copied, setCopied] = useState(false)
	const [successMsg, setSuccessMsg] = useState<string | null>(null)
	const [errorMsg, setErrorMsg] = useState<string | null>(null)
	const [fileLoading, setFileLoading] = useState(false)
	const [file, setFile] = useState<File | null>(null)

	const fetchDeckData = async () => {
		try {
			const res = await api.get(`/decks/${deckId}`)
			setDeck(res.data)
			setFlashcards(res.data.flashcards)
		} catch {
			setErrorMsg('Nie udało się pobrać talii.')
		}
	}

	useEffect(() => {
		if (deckId) fetchDeckData()
	}, [deckId])

	const handleCopyLink = () => {
		if (deck?.public_token) {
			navigator.clipboard.writeText(`${window.location.origin}/share/${deck.public_token}`)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		}
	}

	const toggleShare = async () => {
		try {
			if (!deck?.public_token) {
				await api.put(`/decks/${deckId}/share`)
			} else {
				await api.put(`/decks/${deckId}/unshare`)
			}
			setSuccessMsg('Zmieniono widoczność zestawu')
		} catch {
			setErrorMsg('Wystąpił nieoczekiwany błąd')
		} finally {
			fetchDeckData()
		}
	}

	const handleAddFlashcard = async () => {
		try {
			const res = await api.post(`/decks/${deckId}/flashcards`, { question: '', answer: '' })
			fetchDeckData()
			setSuccessMsg(res.data.message)
		} catch {
			setErrorMsg('Nie udało się dodać fiszki.')
		}
	}

	const handleUpdateFlashcard = async (id: string, text: string, side: 'question' | 'answer') => {
		try {
			const res = await api.post(`/decks/${deckId}/flashcards/${id}`, {
				question: side === 'question' ? text : undefined,
				answer: side === 'answer' ? text : undefined,
			})
			setSuccessMsg(res.data.message)
		} catch (err) {
			console.log(err)
			setErrorMsg('Wystąpił błąd podczas zapisywania')
		}
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setFile(e.target.files[0])
		}
	}

	const handleUpload = (e: React.SubmitEvent) => {
		e.preventDefault()
		setFileLoading(true)
		const reader = new FileReader()

		reader.onload = async e => {
			const text = e.target?.result as string
			if (!text) return

			const lines = text.split(/\r?\n/)
			const flashcardsToUpload = []

			for (const line of lines) {
				if (!line.trim()) continue

				const [question, answer] = line.split(';')

				if (question && answer) {
					flashcardsToUpload.push({
						question: question.trim(),
						answer: answer.trim(),
					})
				}
			}

			try {
				const res = await api.post(`/decks/${deckId}/import`, {
					flashcards: flashcardsToUpload,
				})
				fetchDeckData()
				setSuccessMsg(res.data.message)
			} catch (err) {
				console.error('Błąd podczas wysyłania', err)
				setErrorMsg('Wystąpił błąd podczas wysyłania')
				setFileLoading(false)
			} finally {
				setFileLoading(false)
			}
		}
		reader.readAsText(file!)
	}

	const handleDeleteFlashcard = async (flashcardId: string) => {
		try {
			await api.delete(`/decks/${deckId}/flashcards/${flashcardId}`)
			setFlashcards(prev => prev.filter(f => f._id !== flashcardId))
			setSuccessMsg('Fiszka usunięta!')
		} catch {
			setErrorMsg('Nie udało się usunąć fiszki.')
		}
	}

	if (!deck)
		return (
			<div className='p-8 text-center'>
				<Spinner />
			</div>
		)

	return (
		<div className='sm:py-12'>
			{successMsg && (
				<Toast
					message={successMsg}
					onClose={() => setSuccessMsg(null)}
				/>
			)}
			{errorMsg && (
				<ErrorToast
					message={errorMsg}
					onClose={() => setErrorMsg(null)}
				/>
			)}

			<div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
				<header className='bg-white shadow-sm sm:rounded-2xl p-6 mb-8'>
					<div className='flex flex-row justify-between items-center mb-4'>
						<h2 className='font-semibold text-[1rem] md:text-[1.3rem] text-gray-800 leading-tight'>{deck.name}</h2>
						<Link
							to={`/deck/${deck._id}/learn`}
							className='inline-flex items-center cursor-pointer px-4 py-3 bg-[#9ce4ff] border border-transparent rounded-xl font-semibold text-xs md:text-sm text-white uppercase tracking-widest hover:bg-[#83bfd5] focus:bg-gray-700 active:bg-[#83bfd5] focus:outline-none focus:ring-2 focus:ring-[#9ce4ff] focus:ring-offset-2 transition ease-in-out duration-150'>
							<span>Rozpocznij</span>
							<ArrowRight
								className='size-5'
								strokeWidth={2}
							/>
						</Link>
					</div>

					<div className='flex flex-row'>
						{deck.public_token ? (
							<div className='flex flex-col md:flex-row items-start md:items-center'>
								<PrimaryButton onClick={toggleShare}>Nie udostępniaj</PrimaryButton>
								<div className='flex flex-row items-center mt-4 md:mt-0 md:ms-4'>
									<input
										type='text'
										readOnly
										value={`${window.location.origin}/share/${deck.public_token}`}
										className='border rounded px-3 py-2  md:min-w-[400px]'
									/>
									<button
										onClick={handleCopyLink}
										className='ms-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer'>
										{copied ? <ClipboardCheck className='size-6 text-[#9cf]' /> : <Clipboard className='size-6' />}
									</button>
									{copied && <span className='text-[#9cf] ms-2 text-sm font-semibold'>Skopiowano!</span>}
								</div>
							</div>
						) : (
							<PrimaryButton onClick={toggleShare}>Udostępnij</PrimaryButton>
						)}
					</div>
				</header>

				{fileLoading ? (
					<Spinner />
				) : (
					<div className='w-full flex flex-col justify-center items-center pt-4 pb-5 '>
						<button
							onClick={handleAddFlashcard}
							className='hover:text-[#9ce4ff] transition-colors duration-100 text-gray-400 cursor-pointer'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='0.7'
								stroke='currentColor'
								className='size-24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
								/>
							</svg>
						</button>

						<span className='text-gray-400 mb-4 mt-2'>lub zaimportuj z pliku CSV</span>

						<form
							onSubmit={handleUpload}
							className='w-full flex mt-4 flex-row gap-4 items-center justify-center'>
							<input
								type='file'
								accept='.csv,.txt'
								required
								onChange={handleFileChange}
								className='block text-sm text-gray-500 file:mr-4 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gray-400 cursor-pointer file:text-white hover:file:bg-gray-500'
							/>
							<button
								type='submit'
								className='px-3 py-2 bg-[#9cf] hover:bg-[#89b6e4] rounded-xl text-white cursor-pointer text-center'>
								Dodaj
							</button>
						</form>
					</div>
				)}

				{/* Lista fiszek */}
				<div className='mt-8 flex flex-col items-center'>
					{flashcards.map(card => (
						<FlashcardItem
							key={card._id}
							deckId={deck._id}
							card={card}
							onUpdate={handleUpdateFlashcard}
							onDelete={() => handleDeleteFlashcard(card._id)}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
