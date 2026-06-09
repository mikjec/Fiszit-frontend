import { useEffect, useRef } from 'react'
import { Trash2, X } from 'lucide-react'
import DangerButton from './DangerButton'
import PrimaryButton from './PrimaryButton'

export type ModalMode = 'create' | 'edit' | 'confirm' | null

type ModalProps = {
	mode: ModalMode
	deckName: string
	onNameChange: (v: string) => void
	onSave: () => void
	onDelete: () => void
	onClose: () => void
}

export default function Modal({ mode, deckName, onNameChange, onSave, onDelete, onClose }: ModalProps) {
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (mode === 'create' || mode === 'edit') {
			setTimeout(() => inputRef.current?.focus(), 50)
		}
	}, [mode])

	if (!mode) return null

	const isEdit = mode === 'edit'

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
					className='absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full cursor-pointer text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all'>
					<X className='w-6 h-6' />
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
							onKeyDown={e => {
								if (e.key === 'Enter') onSave()
							}}
							className='w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition-all'
							placeholder='np. Angielski B2'
							autoComplete='off'
						/>
						<div className='flex justify-end mt-6'>
							<PrimaryButton
								disabled={!deckName.trim()}
								className='px-5 py-2.5 bg-sky-300 hover:bg-sky-400 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-white text-sm font-semibold rounded-xl transition-all active:scale-95'
								onClick={onSave}>
								{isEdit ? 'Zapisz zmiany' : 'Utwórz'}
							</PrimaryButton>
						</div>
					</div>
				) : (
					<div>
						<div className='w-11 h-11 rounded-full bg-red-50 flex items-center justify-center mb-4 text-red-500'>
							<Trash2 className='w-5 h-5' />
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
							<DangerButton onClick={onDelete}>Usuń</DangerButton>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
