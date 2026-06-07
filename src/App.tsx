import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Welcome from './pages/Welcome'
import GuestLayout from './layouts/GuestLayout'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import Dashboard from './pages/Dashboard'

function App() {
	return (
		<>
			<Routes>
				<Route element={<PublicRoute />}>
					<Route
						path='/login'
						element={
							<GuestLayout>
								<Login />
							</GuestLayout>
						}
					/>
					<Route
						path='/register'
						element={
							<GuestLayout>
								<Register />
							</GuestLayout>
						}
					/>
					<Route
						path='/'
						element={<Welcome />}
					/>
				</Route>

				<Route element={<ProtectedRoute />}>
					<Route
						path='/dashboard'
						element={<Dashboard />}
					/>
					<Route
						path='/profile'
						// element={<Profile />}
					/>
				</Route>
			</Routes>
		</>
	)
}

export default App
