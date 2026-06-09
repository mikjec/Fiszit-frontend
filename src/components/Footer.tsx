import ApplicationLogo from '../components/ApplicationLogo'

export default function Footer() {
	const year = new Date().getFullYear()

	return (
		<footer className='bg-white border-t border-gray-200 w-full bottom-0 mt-4'>
			<div className='max-w-7xl mx-auto px-4'>
				<div className='flex flex-row justify-around items-center gap-4'>
					<div className='text-sm text-gray-400 flex flex-row gap-4 hidden md:flex'>
						<a
							href='/dashboard'
							className='hover:text-[#7ed9ff] transition-colors'>
							Zestawy
						</a>
						<a
							href='/profile'
							className='hover:text-[#7ed9ff] transition-colors'>
							Moje konto
						</a>
					</div>

					<div className='flex text-xs md:text-sm font-medium text-gray-500 items-center'>
						&copy; {year} FiszIt! Wszystkie prawa zastrzeżone.
					</div>

					<div className='flex items-center text-gray-800'>
						<ApplicationLogo className='w-15 h-15 md:w-20 md:h-20' />
					</div>
				</div>
			</div>
		</footer>
	)
}
