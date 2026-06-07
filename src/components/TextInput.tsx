export default function TextInput({ disabled = false, className = '', ...props }) {
	return (
		<input
			disabled={disabled}
			className={`focus:ring-2 focus:ring-[#9ce4ff] focus:border-[#9ce4ff] focus:outline-none rounded-lg shadow-sm border-1 p-2 border-gray-200 ${className}`}
			{...props}
		/>
	)
}
