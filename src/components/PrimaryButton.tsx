export default function PrimaryButton({ children = '', className = '', disabled = false, ...props }) {
	return (
		<button
			type='submit'
			disabled={disabled}
			className={`inline-flex items-center cursor-pointer px-4 py-3 bg-[#9ce4ff] border border-transparent rounded-xl font-semibold text-xs text-white uppercase tracking-widest hover:bg-[#83bfd5] focus:bg-gray-700 active:bg-[#83bfd5] focus:outline-none focus:ring-2 focus:ring-[#9ce4ff] focus:ring-offset-2 transition ease-in-out duration-150 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
			{...props}>
			{children}
		</button>
	)
}
