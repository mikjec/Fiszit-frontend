import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navigation from '../components/Navigation'
import { useEffect, useState } from 'react'
import api from '../api/axios'

export interface User {
	username: string
	email: string
}

export default function AppLayout() {
	const [user, setUser] = useState<User | null>(null)

	const getUser = async () => {
		try {
			const res = await api.get('/auth/user')
			setUser(res.data)
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		getUser()
	}, [])

	return (
		<div className='min-h-screen flex flex-col justify-between'>
			<div>
				<Navigation user={user} />
				<main>
					<Outlet />
				</main>
			</div>
			<Footer />
		</div>
	)
}
