import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import InputLabel from '../components/InputLabel'
import TextInput from '../components/TextInput'
import InputError from '../components/InputError'
import PrimaryButton from '../components/PrimaryButton'

export default function Register() {
	const navigate = useNavigate()

	const [username, setUsername] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')
	const [errors, setErrors] = useState<Record<string, string>>({})

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		setErrors({})

		if (password !== passwordConfirmation) {
			setErrors({ password_confirmation: 'Hasła muszą być takie same' })
			return
		}

		try {
			await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
				username,
				email,
				password,
			})

			navigate('/login')
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setErrors({ general: error.response?.data?.message ?? 'Błąd rejestracji' })
			} else {
				setErrors({ general: 'Coś poszło nie tak' })
			}
		}
	}

	return (
		<div className='bg-white rounded-xl shadow-md py-4 lg:py-10 px-6 lg:px-10 w-[85vw] max-w-[400px] md:max-w-[500px]'>
			<form onSubmit={handleSubmit}>
				{errors.general && <div className='mb-4 text-sm text-red-600'>{errors.general}</div>}

				<div>
					<InputLabel
						htmlFor='username'
						value='Nazwa użytkownika'
					/>
					<TextInput
						id='username'
						name='username'
						type='text'
						className='block mt-1 w-full'
						value={username}
						required
						autoFocus
						autoComplete='username'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
					/>
					<InputError
						message={errors.username}
						className='mt-2'
					/>
				</div>

				<div className='mt-4'>
					<InputLabel
						htmlFor='email'
						value='Email'
					/>
					<TextInput
						id='email'
						name='email'
						type='email'
						className='block mt-1 w-full'
						value={email}
						required
						autoComplete='email'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
					/>
					<InputError
						message={errors.email}
						className='mt-2'
					/>
				</div>

				<div className='mt-4'>
					<InputLabel
						htmlFor='password'
						value='Hasło'
					/>
					<TextInput
						id='password'
						name='password'
						type='password'
						className='block mt-1 w-full'
						required
						autoComplete='new-password'
						value={password}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
					/>
					<InputError
						message={errors.password}
						className='mt-2'
					/>
				</div>

				<div className='mt-4'>
					<InputLabel
						htmlFor='password_confirmation'
						value='Potwierdź hasło'
					/>
					<TextInput
						id='password_confirmation'
						name='password_confirmation'
						type='password'
						className='block mt-1 w-full'
						required
						autoComplete='new-password'
						value={passwordConfirmation}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(e.target.value)}
					/>
					<InputError
						message={errors.password_confirmation}
						className='mt-2'
					/>
				</div>

				<div className='flex flex-col-reverse py-3 gap-4 sm:flex-row items-end sm:items-center justify-between mt-4'>
					<Link
						to='/login'
						className='underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9ce4ff]'>
						Masz już konto?
					</Link>
					<PrimaryButton className='ms-4 md:text-base'>Zarejestruj się</PrimaryButton>
				</div>
			</form>
		</div>
	)
}
