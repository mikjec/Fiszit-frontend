export default function AuthSessionStatus({ status, className = '', ...props }) {
	if (!status) return null

	return (
		<div
			className={`font-medium text-sm text-green-600 ${className}`}
			{...props}>
			{status}
		</div>
	)
}
