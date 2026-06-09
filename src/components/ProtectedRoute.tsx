import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
	const token = useAuth()
	const location = useLocation()

	if (!token) {
		return (
			<Navigate
				to='/'
				state={{ from: location }}
				replace
			/>
		)
	}

	return children ? <>{children}</> : <Outlet />
}

export default ProtectedRoute
