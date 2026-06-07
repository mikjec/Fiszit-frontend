import { useState, useEffect, useRef } from 'react'

type Deck = {
	id: number
	name: string
}

type ModalMode = 'create' | 'edit' | 'confirm' | null

const initialDecks: Deck[] = [
	{ id: 1, name: 'Angielski - poziom B2' },
	{ id: 2, name: 'Matematyka - całki' },
	{ id: 3, name: 'Historia Polski' },
]

function PlusIcon() {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			strokeWidth={1.8}
			stroke='currentColor'
			className='w-5 h-5'>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
			/>
		</svg>
	)
}

function EditIcon() {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			strokeWidth={1.8}
			stroke='currentColor'
			className='w-4 h-4'>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125'
			/>
		</svg>
	)
}

function TrashIcon() {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			strokeWidth={1.8}
			stroke='currentColor'
			className='w-4 h-4'>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z'
			/>
		</svg>
	)
}

function CardsIcon() {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			strokeWidth={1.5}
			stroke='currentColor'
			className='w-4 h-4'>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3'
			/>
		</svg>
	)
}

function CheckIcon() {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='currentColor'
			viewBox='0 0 20 20'
			className='w-4 h-4'>
			<path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
		</svg>
	)
}

function CloseIcon() {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 14 14'
			className='w-3 h-3'>
			<path
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
			/>
		</svg>
	)
}

type ToastProps = { message: string; onClose: () => void }

function Toast({ message, onClose }: ToastProps) {
	useEffect(() => {
		const t = setTimeout(onClose, 3000)
		return () => clearTimeout(t)
	}, [onClose])

	return (
		<div className='fixed top-5 right-5 z-[100] flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 shadow-xl text-emerald-800 text-sm font-medium animate-[slideIn_0.25s_ease-out]'>
			<span className='text-emerald-500'>
				<CheckIcon />
			</span>
			<span>{message}</span>
			<button
				onClick={onClose}
				className='ml-2 text-emerald-400 hover:text-emerald-600 transition-colors'>
				<CloseIcon />
			</button>
		</div>
	)
}

type ModalProps = {
	mode: ModalMode
	deckName: string
	onNameChange: (v: string) => void
	onSave: () => void
	onDelete: () => void
	onClose: () => void
	isEdit: boolean
}

function Modal({ mode, deckName, onNameChange, onSave, onDelete, onClose, isEdit }: ModalProps) {
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (mode === 'create' || mode === 'edit') {
			setTimeout(() => inputRef.current?.focus(), 50)
		}
	}, [mode])

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && mode !== 'confirm') onSave()
	}

	if (!mode) return null

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm'
			onClick={e => {
				if (e.target === e.currentTarget) onClose()
			}}
			onKeyDown={e => {
				if (e.key === 'Escape') onClose()
			}}
			tabIndex={-1}>
			<div className='bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-7 relative animate-[popIn_0.2s_cubic-bezier(.175,.885,.32,1.275)]'>
				<button
					onClick={onClose}
					className='absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all text-sm'>
					✕
				</button>

				{mode !== 'confirm' ? (
					<div>
						<h2 className='text-lg font-bold text-gray-800 mb-5 tracking-tight'>
							{isEdit ? 'Edytuj zestaw' : 'Nowy zestaw'}
						</h2>
						<label className='block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2'>
							Nazwa zestawu
						</label>
						<input
							ref={inputRef}
							type='text'
							value={deckName}
							onChange={e => onNameChange(e.target.value)}
							onKeyDown={handleKeyDown}
							className='w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition-all'
							placeholder='np. Angielski B2'
							autoComplete='off'
						/>
						<div className='flex justify-end mt-6'>
							<button
								onClick={onSave}
								disabled={!deckName.trim()}
								className='px-5 py-2.5 bg-sky-300 hover:bg-sky-400 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all active:scale-95'>
								{isEdit ? 'Zapisz zmiany' : 'Utwórz'}
							</button>
						</div>
					</div>
				) : (
					<div>
						<div className='w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4 text-red-500'>
							<TrashIcon />
						</div>
						<h2 className='text-lg font-bold text-gray-800 mb-2 tracking-tight'>Usuń zestaw</h2>
						<p className='text-sm text-gray-500 mb-6'>
							Tej operacji nie można cofnąć. Wszystkie fiszki zostaną trwale usunięte.
						</p>
						<div className='flex gap-3 justify-end'>
							<button
								onClick={onClose}
								className='px-4 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-800 rounded-xl hover:bg-gray-100 transition-all'>
								Anuluj
							</button>
							<button
								onClick={onDelete}
								className='px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl transition-all active:scale-95'>
								Usuń
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default function DeckDashboard() {
	const [decks, setDecks] = useState<Deck[]>(initialDecks)
	const [modalMode, setModalMode] = useState<ModalMode>(null)
	const [activeDeckId, setActiveDeckId] = useState<number | null>(null)
	const [deckName, setDeckName] = useState('')
	const [toast, setToast] = useState<string | null>(null)
	const nextId = useRef(100)

	const openCreate = () => {
		setActiveDeckId(null)
		setDeckName('')
		setModalMode('create')
	}

	const openEdit = (deck: Deck) => {
		setActiveDeckId(deck.id)
		setDeckName(deck.name)
		setModalMode('edit')
	}

	const openConfirm = (id: number) => {
		setActiveDeckId(id)
		setModalMode('confirm')
	}

	const closeModal = () => {
		setModalMode(null)
		setActiveDeckId(null)
		setDeckName('')
	}

	const handleSave = () => {
		if (!deckName.trim()) return
		if (modalMode === 'create') {
			const newDeck: Deck = { id: nextId.current++, name: deckName.trim() }
			setDecks(prev => [...prev, newDeck])
			setToast('Zestaw został utworzony.')
		} else if (modalMode === 'edit' && activeDeckId !== null) {
			setDecks(prev => prev.map(d => (d.id === activeDeckId ? { ...d, name: deckName.trim() } : d)))
			setToast('Nazwa zestawu została zmieniona.')
		}
		closeModal()
	}

	const handleDelete = () => {
		setDecks(prev => prev.filter(d => d.id !== activeDeckId))
		setToast('Zestaw został usunięty.')
		closeModal()
	}

	return (
		<>
			<style>{`
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
        }
      `}</style>

			{toast && (
				<Toast
					message={toast}
					onClose={() => setToast(null)}
				/>
			)}

			<div className='min-h-screen  font-sans'>
				{/* Header */}
				<header className='bg-white border-b border-gray-100 shadow-sm'>
					<div className='max-w-4xl mx-auto px-6 py-4 flex items-center justify-between'>
						<div className='flex items-center gap-3'>
							<div className='w-8 h-8 rounded-lg bg-sky-300 flex items-center justify-center text-white'>
								<CardsIcon />
							</div>
							<h1 className='text-base font-bold text-gray-800 tracking-tight'>Panel użytkownika</h1>
						</div>
					</div>
				</header>

				{/* Content */}
				<main className='max-w-4xl mx-auto px-6 py-10'>
					<div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
						{/* Section header */}
						<div className='px-7 pt-7 pb-5 flex items-center justify-between border-b border-gray-50'>
							<div>
								<h2 className='text-xl font-bold text-gray-800 tracking-tight'>Moje zestawy</h2>
								<p className='text-sm text-gray-400 mt-0.5'>
									{decks.length === 0
										? 'Brak zestawów'
										: `${decks.length} ${decks.length === 1 ? 'zestaw' : decks.length < 5 ? 'zestawy' : 'zestawów'}`}
								</p>
							</div>
							<button
								onClick={openCreate}
								className='flex items-center gap-2 px-4 py-2 bg-sky-300 hover:bg-sky-400 text-white text-sm font-semibold rounded-xl transition-all active:scale-95 shadow-sm'>
								<PlusIcon />
								Dodaj zestaw
							</button>
						</div>

						{/* Deck list */}
						<div className='px-4 py-4'>
							{decks.length === 0 ? (
								<div className='text-center py-16 text-gray-400'>
									<div className='w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4 text-gray-300'>
										<CardsIcon />
									</div>
									<p className='text-sm font-medium'>Nie masz jeszcze żadnych zestawów.</p>
									<p className='text-xs mt-1'>Kliknij „Dodaj zestaw", aby zacząć.</p>
								</div>
							) : (
								<ul className='space-y-2'>
									{decks.map((deck, i) => (
										<li
											key={deck.id}
											className='group flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-gray-50 transition-all cursor-pointer border border-transparent hover:border-gray-100'
											style={{ animation: `fadeUp 0.2s ease-out ${i * 40}ms both` }}>
											<a
												href={`/decks/${deck.id}/flashcards`}
												className='flex-1 min-w-0 flex items-center gap-3'>
												<div className='w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-400 flex-shrink-0 group-hover:bg-sky-100 transition-colors'>
													<CardsIcon />
												</div>
												<span className='text-sm font-medium text-gray-700 truncate group-hover:text-gray-900 transition-colors'>
													{deck.name}
												</span>
											</a>

											<div className='flex items-center gap-1 ml-3 opacity-0 group-hover:opacity-100 transition-opacity'>
												<button
													onClick={e => {
														e.preventDefault()
														openEdit(deck)
													}}
													className='p-2 rounded-lg text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 transition-all'
													title='Edytuj'>
													<EditIcon />
												</button>
												<button
													onClick={e => {
														e.preventDefault()
														openConfirm(deck.id)
													}}
													className='p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all'
													title='Usuń'>
													<TrashIcon />
												</button>
											</div>
										</li>
									))}
								</ul>
							)}
						</div>
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
				isEdit={modalMode === 'edit'}
			/>
		</>
	)
}
