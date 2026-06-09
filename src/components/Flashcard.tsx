import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import Spinner from '../components/Spinner'

export interface Flashcard {
	_id: string
	question: string
	answer: string
}

interface FlashcardItemProps {
	deckId: string
	card: Flashcard
	onUpdate: (id: string, text: string, side: 'question' | 'answer') => Promise<void> | void
	onDelete: () => void
}

export default function Flashcard({ card, onUpdate, onDelete }: FlashcardItemProps) {
	const [question, setQuestion] = useState(card.question)
	const [answer, setAnswer] = useState(card.answer)
	const [questionSaving, setQuestionSaving] = useState(false)
	const [answerSaving, setAnswerSaving] = useState(false)

	const saveField = async (
		side: 'question' | 'answer',
		text: string,
		originalText: string,
		setSaving: (status: boolean) => void,
	) => {
		if (text === originalText) return

		setSaving(true)
		try {
			await onUpdate(card._id, text, side)
		} catch (error) {
			console.error(`Błąd podczas zapisywania ${side}:`, error)
		} finally {
			setSaving(false)
		}
	}

	return (
		<div className='w-full flex flex-col justify-center items-center'>
			<hr className='border-t-2 border-gray-300 w-[60%] m-6' />
			<div className='flex flex-col lg:flex-row justify-between gap-4'>
				<div className='bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-4 w-[300px] h-[200px] md:w-[350px] md:h-[250px] focus-within:ring-2 focus-within:ring-indigo-100 transition-all flex flex-col relative'>
					<div className='flex flex-row justify-between items-center mb-2'>
						<label className='block font-semibold text-gray-400 uppercase'>Pytanie</label>
						<button
							onClick={onDelete}
							className='text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer'>
							<Trash2 className='size-4' />
						</button>
					</div>
					<textarea
						className='w-full flex-grow resize-none border-none p-0 focus:ring-0 text-gray-700 leading-relaxed placeholder:text-gray-300 text-[1.2rem] md:text-[1.4rem] outline-none'
						placeholder='Wpisz pytanie...'
						value={question}
						onChange={e => setQuestion(e.target.value)}
						onBlur={e => saveField('question', e.target.value, card.question, setQuestionSaving)}
					/>
					<div className='absolute bottom-4 right-4'>{questionSaving && <Spinner />}</div>
				</div>

				<div className='bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-4 w-[300px] h-[200px] md:w-[350px] md:h-[250px] focus-within:ring-2 focus-within:ring-indigo-100 transition-all flex flex-col relative'>
					<label className='block font-semibold text-gray-400 uppercase mb-2'>Odpowiedź</label>
					<textarea
						className='w-full flex-grow resize-none border-none p-0 focus:ring-0 text-gray-700 leading-relaxed placeholder:text-gray-300 text-[1.2rem] md:text-[1.4rem] outline-none'
						placeholder='Wpisz odpowiedź...'
						value={answer}
						onChange={e => setAnswer(e.target.value)}
						onBlur={e => saveField('answer', e.target.value, card.answer, setAnswerSaving)}
					/>
					<div className='absolute bottom-4 right-4'>{answerSaving && <Spinner />}</div>
				</div>
			</div>
		</div>
	)
}
