export default function InputError({ messages = '', className = '', ...props }) {
	if (!messages || (Array.isArray(messages) && messages.length === 0)) return null

	const messageArray = Array.isArray(messages) ? messages : [messages]

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
