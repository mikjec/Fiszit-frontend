import { useState } from 'react'
import type { Flashcard } from './Flashcard'

interface FlipCardProps {
	card: Flashcard
}

export default function FlipCard({ card }: FlipCardProps) {
	const [flipped, setFlipped] = useState(false)

	return (
		<div
			className='card-box w-[250px] h-[350px] sm:w-[300px] sm:h-[400px] m-8'
			onClick={() => setFlipped(f => !f)}>
			<div className={`learning-card${flipped ? ' flipped' : ''}`}>
				<div className='question-card p-4'>
					<span className='text-[1rem]'>{card.question}</span>
					<span className='absolute bottom-0 right-0 p-4 text-white font-semibold '>Odpowiedź &gt;&gt;</span>
				</div>
				<div className='answer-card p-4'>
					<span className='text-[1rem]'>{card.answer}</span>
				</div>
			</div>
		</div>
	)
}
