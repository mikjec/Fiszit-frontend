import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
	const { token, isLoading } = useAuth()
	const location = useLocation()

	if (isLoading) return <div>Loading...</div>

	if (!token) {
		return (
			<Navigate
				to='/login'
				state={{ from: location }}
				replace
			/>
		)
	}

	return children ? <>{children}</> : <Outlet />
}

export default ProtectedRoute
