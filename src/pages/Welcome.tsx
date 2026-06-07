import { Link } from 'react-router-dom'
import ApplicationLogo from '../components/ApplicationLogo'
import helloGif from '../assets/hello.gif'

export default function Welcome() {
	return (
		<div className='min-h-screen flex flex-col items-center justify-center p-6 lg:p-8 text-[#1b1b18] bg-[#9ce4ff] bg-[linear-gradient(27deg,rgba(156,228,255,1)_0%,rgba(255,255,255,1)_100%)]'>
			<div className='bg-white rounded-2xl shadow-2xl p-8 h-[70vh] sm:max-w-[550px] lg:max-w-[800px] max-h-[600px] lg:flex lg:flex-row items-center justify-center'>
				<div className='h-[30%] flex items-center justify-center mb-4'>
					<ApplicationLogo className='w-[220px] text-base md:w-[300px] lg:w-[430px]' />
				</div>

				<div className='flex flex-col items-center justify-evenly h-[70%]'>
					<div className='w-[50%]'>
						<img
							src={helloGif}
							alt='hello typing gif'
						/>
					</div>

					<div className='flex flex-col items-center justify-center gap-4'>
						<Link
							to='/login'
							className='welcome-btn'>
							Zaloguj się
						</Link>

						<span className='text-[#bbb] lg:text-[1.4em]'>lub</span>

						<Link
							to='/register'
							className='welcome-btn'>
							Zarejestruj się
						</Link>
					</div>
				</div>
			</div>

			<div className='hidden lg:block h-14' />
		</div>
	)
}
