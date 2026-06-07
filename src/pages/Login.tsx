import { useState } from 'react'
import InputError from '../components/InputError'
import InputLabel from '../components/InputLabel'
import PrimaryButton from '../components/PrimaryButton'
import TextInput from '../components/TextInput'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

interface LocationState {
	from?: Location
}

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const navigate = useNavigate()
	const location = useLocation()
	const state = location.state as LocationState
	const from = state?.from?.pathname ?? '/dashboard'
	const [error, setError] = useState<string | null>(null)

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
				email: email,
				password: password,
			})

			localStorage.setItem('token', response.data.token)
			navigate(from, { replace: true })
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setError(error.response?.data?.message ?? 'Błąd logowania')
			} else {
				setError('Coś poszło nie tak')
			}
		}
	}

	return (
		<div className='bg-white shadow-md p-6  md:px-12 mx-2 rounded-2xl w-[85vw] max-w-[400px] md:max-w-[500px]'>
			<form onSubmit={handleSubmit}>
				{/* Email */}
				<div>
					<InputLabel
						htmlFor='email'
						value='Email'
					/>

					<TextInput
						id='email'
						className='block w-full'
						type='email'
						name='email'
						value={email}
						required
						autoFocus
						autoComplete='username'
						onChange={e => setEmail(e.target.value)}
					/>
				</div>

				{/* Password */}
				<div className='mt-4 mb-6'>
					<InputLabel
						htmlFor='password'
						value='Hasło'
					/>

					<TextInput
						id='password'
						className='block w-full'
						type='password'
						name='password'
						value={password}
						required
						autoComplete='current-password'
						onChange={e => setPassword(e.target.value)}
					/>
				</div>

				{error && (
					<InputError
						messages={error}
						className='mt-2'
					/>
				)}

				{/* Remember me */}
				{/* <div className='block mt-4'>
					<label
						htmlFor='remember_me'
						className='inline-flex items-center'>
						<input
							id='remember_me'
							type='checkbox'
							checked={data.remember}
							onChange={e =>
								setData(prev => ({
									...prev,
									remember: e.target.checked,
								}))
							}
							className='rounded border-gray-300 text-[#9ce4ff] focus:ring-[#9ce4ff]'
						/>

						<span className='ms-2 text-sm text-gray-600'>Nie wylogowywuj mnie</span>
					</label>
				</div> */}

				<div className='w-full flex flex-col-reverse sm:flex-row items-end gap-4 py-4 sm:items-center justify-between'>
					<a
						href='/register'
						className='underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
						Nie masz jeszcze konta?
					</a>

					<PrimaryButton className='ms-3 md:text-base'>Zaloguj się</PrimaryButton>
				</div>
			</form>
		</div>
	)
}
