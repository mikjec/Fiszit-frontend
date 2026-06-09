import { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import ApplicationLogo from './ApplicationLogo'
import type { User } from '../layouts/AppLayout'

export default function Navbar({ user }: { user: User | null }) {
	const [mobileOpen, setMobileOpen] = useState(false)
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const navigate = useNavigate()

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
				setDropdownOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const logOut = () => {
		localStorage.removeItem('token')
		navigate('/')
	}

	const desktopNavClass = ({ isActive }: { isActive: boolean }) =>
		`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-150 ${
			isActive
				? 'border-sky-300 text-gray-900'
				: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
		}`

	const mobileNavClass = ({ isActive }: { isActive: boolean }) =>
		`block w-full px-4 py-2 text-sm font-medium transition-colors duration-150 ${
			isActive
				? 'bg-sky-50 border-l-2 border-sky-300 text-sky-700'
				: 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
		}`

	return (
		<nav className='bg-white border-b border-gray-100 sticky top-0 z-40'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between h-16'>
					<div className='flex items-center'>
						<NavLink
							to='/dashboard'
							className='shrink-0 flex items-center'>
							<ApplicationLogo className='block h-12 w-auto fill-current text-gray-800' />
						</NavLink>
						<div className='hidden sm:flex sm:items-center sm:ms-10 sm:space-x-8 h-full'>
							<NavLink
								to='/dashboard'
								className={desktopNavClass}>
								Zestawy
							</NavLink>
						</div>
					</div>

					<div
						className='hidden sm:flex sm:items-center sm:ms-6 relative'
						ref={dropdownRef}>
						<button
							onClick={() => setDropdownOpen(v => !v)}
							className='inline-flex items-center gap-1.5 px-3 py-2 border border-transparent text-sm font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition-colors duration-150 cursor-pointer'>
							<span>{user?.username}</span>
							<ChevronDown
								className={`w-4 h-4 transition-transform duration-150 ${dropdownOpen ? 'rotate-180' : ''}`}
							/>
						</button>

						{dropdownOpen && (
							<div className='absolute top-14 right-4 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 animate-[popIn_0.15s_ease-out]'>
								<NavLink
									to='/profile'
									className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors'
									onClick={() => setDropdownOpen(false)}>
									Konto
								</NavLink>
								<div className='border-t border-gray-100 my-1' />
								<button
									onClick={() => {
										setDropdownOpen(false)
										logOut()
									}}
									className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer'>
									Wyloguj się
								</button>
							</div>
						)}
					</div>

					<div className='flex items-center sm:hidden'>
						<button
							onClick={() => setMobileOpen(v => !v)}
							className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none transition duration-150'>
							{mobileOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
						</button>
					</div>
				</div>
			</div>

			{mobileOpen && (
				<div className='sm:hidden border-t border-gray-100'>
					<div className='pt-2 pb-3 space-y-1'>
						<NavLink
							to='/dashboard'
							className={mobileNavClass}
							onClick={() => setMobileOpen(false)}>
							Zestawy
						</NavLink>
					</div>

					<div className='pt-4 pb-3 border-t border-gray-200'>
						<div className='px-4 mb-3'>
							<div className='font-medium text-base text-gray-800'>{user?.username}</div>
						</div>
						<div className='space-y-1'>
							<NavLink
								to='/profile'
								className={mobileNavClass}
								onClick={() => setMobileOpen(false)}>
								Konto
							</NavLink>
							<button
								onClick={logOut}
								className='block w-full text-left px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors'>
								Wyloguj się
							</button>
						</div>
					</div>
				</div>
			)}

			<style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.95) translateY(-4px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
		</nav>
	)
}
