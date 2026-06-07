import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const PublicRoute = () => {
	const { token, isLoading } = useAuth()

	if (isLoading) return <div>Loading...</div>

	if (token)
		return (
			<Navigate
				to='/dashboard'
				replace
			/>
		)

	return <Outlet />
}

export default PublicRoute
