import { useState, useEffect } from 'react'
import { LayersPlus, Layers } from 'lucide-react'
import Modal from '../components/Modal'
import type { ModalMode } from '../components/Modal'
import Toast from '../components/Toast'
import DeckItem, { type Deck } from '../components/DeckItem'
import PrimaryButton from '../components/PrimaryButton'
import api from '../api/axios'
import ErrorToast from '../components/Errortoast'
import Spinner from '../components/Spinner'

export default function Dashboard() {
	const [decks, setDecks] = useState<Deck[]>([])
	const [modalMode, setModalMode] = useState<ModalMode>(null)
	const [activeDeckId, setActiveDeckId] = useState<string | null>(null)
	const [deckName, setDeckName] = useState('')
	const [toast, setToast] = useState<string | null>(null)
	const [isLoading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const openCreate = () => {
		setActiveDeckId(null)
		setDeckName('')
		setModalMode('create')
	}

	const openEdit = (deck: Deck) => {
		setActiveDeckId(deck._id)
		setDeckName(deck.name)
		setModalMode('edit')
	}

	const openConfirm = (id: string) => {
		setActiveDeckId(id)
		setModalMode('confirm')
	}

	const closeModal = () => {
		setModalMode(null)
		setActiveDeckId(null)
		setDeckName('')
	}

	const getDecks = async () => {
		setLoading(true)
		try {
			const res = await api.get('/decks')
			setDecks(res.data.decks)
			setLoading(false)
		} catch (err) {
			console.log(err)
			setError('Wystąpił błąd, spróbuj ponownie później.')
		}
	}
	const createDeck = async () => {
		try {
			await api.post('/decks', { name: deckName.trim() })
			await getDecks()
		} catch (err) {
			console.log(err)
			setError('Wystąpił błąd, spróbuj ponownie później.')
		}
	}

	const updateDeck = async (id: string) => {
		try {
			await api.put(`/decks/${id}`, { name: deckName.trim() })
			await getDecks()
		} catch (err) {
			console.log(err)
			setError('Wystąpił błąd, spróbuj ponownie później.')
		}
	}

	const deleteDeck = async (id: string) => {
		try {
			await api.delete(`/decks/${id}`)
			await getDecks()
		} catch (err) {
			console.log(err)
			setError('Wystąpił błąd, spróbuj ponownie później.')
		}
	}

	useEffect(() => {
		getDecks()
	}, [])

	const handleSave = async () => {
		if (!deckName.trim()) return
		if (modalMode === 'create') {
			await createDeck()
			setToast('Zestaw został utworzony.')
		} else if (modalMode === 'edit' && activeDeckId !== null) {
			await updateDeck(activeDeckId)
			setToast('Nazwa zestawu została zmieniona.')
		}
		closeModal()
	}

	const handleDelete = async () => {
		if (!activeDeckId) return
		await deleteDeck(activeDeckId)
		setToast('Zestaw został usunięty.')
		closeModal()
	}

	const deckCount = decks.length
	const deckLabel =
		deckCount === 0
			? 'Brak zestawów'
			: deckCount === 1
				? '1 zestaw'
				: deckCount < 5
					? `${deckCount} zestawy`
					: `${deckCount} zestawów`

	return (
		<>
			<style>
				{`
					@keyframes slideIn {
					from { opacity: 0; transform: translateX(1rem); }
					to   { opacity: 1; transform: translateX(0); }
					}
					@keyframes popIn {
					from { opacity: 0; transform: scale(0.92); }
					to   { opacity: 1; transform: scale(1); }
					}
					@keyframes fadeUp {
					from { opacity: 0; transform: translateY(8px); }
					to   { opacity: 1; transform: translateY(0); }
					}`}
			</style>

			{toast && (
				<Toast
					message={toast}
					onClose={() => setToast(null)}
				/>
			)}
			{error && (
				<ErrorToast
					message={error}
					onClose={() => setError(null)}
				/>
			)}

			<div className='min-h-screen  font-sans'>
				<header className='bg-white border-b border-gray-100 shadow-sm'>
					<div className='max-w-4xl mx-auto px-6 py-4 flex items-center gap-3'>
						<h1 className='text-base font-bold text-gray-800 tracking-tight'>Panel użytkownika</h1>
					</div>
				</header>

				<main className='max-w-4xl mx-auto px-6 py-10'>
					<div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
						<div className='px-7 pt-7 pb-5 flex items-center justify-between border-b border-gray-50'>
							<div>
								<h2 className='text-xl font-bold text-gray-800 tracking-tight'>Moje zestawy</h2>
								<p className='text-sm text-gray-400 mt-0.5'>{deckLabel}</p>
							</div>
							<PrimaryButton
								onClick={openCreate}
								className='flex items-center gap-2 px-4 py-2 bg-sky-300 hover:bg-sky-400 text-white text-sm font-semibold rounded-xl transition-all active:scale-95 shadow-sm'>
								<LayersPlus className='w-4 h-4' />
								Dodaj zestaw
							</PrimaryButton>
						</div>

						{isLoading ? (
							<div className='text-center w-full py-10'>
								<Spinner />
							</div>
						) : (
							<div className='px-4 py-4'>
								{decks.length === 0 ? (
									<div className='text-center py-16 text-gray-400'>
										<div className='w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4 text-gray-300'>
											<Layers className='w-6 h-6' />
										</div>
										<p className='text-sm font-medium'>Nie masz jeszcze żadnych zestawów.</p>
										<p className='text-xs mt-1'>Kliknij „Dodaj zestaw", aby zacząć.</p>
									</div>
								) : (
									<ul className='space-y-2'>
										{decks.map((deck, i) => (
											<DeckItem
												key={deck._id}
												deck={deck}
												index={i}
												onEdit={openEdit}
												onDelete={openConfirm}
											/>
										))}
									</ul>
								)}
							</div>
						)}
					</div>
				</main>
			</div>

			<Modal
				mode={modalMode}
				deckName={deckName}
				onNameChange={setDeckName}
				onSave={handleSave}
				onDelete={handleDelete}
				onClose={closeModal}
			/>
		</>
	)
}
