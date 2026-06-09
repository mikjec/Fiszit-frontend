import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Welcome from './pages/Welcome'
import GuestLayout from './layouts/GuestLayout'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import Dashboard from './pages/Dashboard'
import AppLayout from './layouts/AppLayout'
import Deck from './pages/Deck'
import DeckLearn from './pages/DeckLearn'
import DeckPublic from './pages/DeckPublic'

function App() {
	return (
		<Routes>
			<Route element={<PublicRoute />}>
				<Route element={<GuestLayout />}>
					<Route
						path='/login'
						element={<Login />}
					/>
					<Route
						path='/register'
						element={<Register />}
					/>
				</Route>
				<Route
					path='/'
					element={<Welcome />}
				/>
			</Route>

			<Route element={<GuestLayout />}>
				<Route
					path='/share/:token'
					element={<DeckPublic />}
				/>
			</Route>

			<Route element={<ProtectedRoute />}>
				<Route element={<AppLayout />}>
					<Route
						path='/dashboard'
						element={<Dashboard />}
					/>
					<Route
						path='/deck/:id'
						element={<Deck />}
					/>
					<Route
						path='/deck/:id/learn'
						element={<DeckLearn />}
					/>

					<Route
						path='/profile'
						// element={<Profile />}
					/>
				</Route>
			</Route>
		</Routes>
	)
}

export default App
