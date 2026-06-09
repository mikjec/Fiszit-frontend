export default function InputError({ message = '', className = '', ...props }) {
	if (!message || (Array.isArray(message) && message.length === 0)) return null

	const messageArray = Array.isArray(message) ? message : [message]

	return (
		<ul
			className={`text-sm text-red-600 space-y-1 ${className}`}
			{...props}>
			{messageArray.map((message, index) => (
				<li key={index}>{message}</li>
			))}
		</ul>
	)
}
