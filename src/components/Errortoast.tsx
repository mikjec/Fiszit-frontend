import { useEffect } from 'react'
import { XCircle, X } from 'lucide-react'

type ErrorToastProps = {
	message: string
	onClose: () => void
}

export default function ErrorToast({ message, onClose }: ErrorToastProps) {
	useEffect(() => {
		const t = setTimeout(onClose, 3000)
		return () => clearTimeout(t)
	}, [onClose])

	return (
		<div className='fixed top-5 right-5 z-[100] flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-200 shadow-xl text-red-800 text-sm font-medium animate-[slideIn_0.25s_ease-out]'>
			<XCircle className='w-4 h-4 text-red-500 shrink-0' />
			<span>{message}</span>
			<button
				onClick={onClose}
				className='ml-1 text-red-400 hover:text-red-600 transition-colors'>
				<X className='w-3.5 h-3.5' />
			</button>
		</div>
	)
}
