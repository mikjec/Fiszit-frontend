import React from 'react'
import ApplicationLogo from '../components/ApplicationLogo'

export default function GuestLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='font-sans text-gray-900 antialiased'>
			<div className='min-h-screen min-w-screen flex flex-col sm:justify-center items-center sm:pt-0 sm:pb-16'>
				{/* Logo */}
				<div className='m-1'>
					<a href='/'>
						<ApplicationLogo className='w-50 h-50 md:w-70 md:h-70 fill-current text-gray-500' />
					</a>
				</div>

				<div className=' sm:max-w-130 mt-1 py-4 overflow-hidden sm:rounded-xl'>{children}</div>
			</div>
		</div>
	)
}
