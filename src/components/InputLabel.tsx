export default function InputLabel({ value = '', children = '', className = '', htmlFor = '', ...props }) {
	return (
		<label
			htmlFor={htmlFor}
			className={`block font-medium text-sm sm:text-base md:text-lg mb-2 mt-2 text-gray-700 ${className}`}
			{...props}>
			{value || children}
		</label>
	)
}
