export default function DangerButton({ children = '', className = '', ...props }) {
	return (
		<button
			type='submit'
			className={`px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl cursor-pointer transition-all active:scale-95 ${className}`}
			{...props}>
			{children}
		</button>
	)
}
