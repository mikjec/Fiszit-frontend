import { useState, useEffect } from 'react'

interface JwtPayload {
	exp: number
	[key: string]: unknown
}

const isTokenExpired = (token: string): boolean => {
	try {
		const payload: JwtPayload = JSON.parse(atob(token.split('.')[1]))
		return Date.now() >= payload.exp * 1000
	} catch {
		return true
	}
}

interface AuthState {
	token: string | null
	isLoading: boolean
}

export const useAuth = (): AuthState => {
	const [token, setToken] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		const stored = localStorage.getItem('token')

		if (stored && !isTokenExpired(stored)) {
			setToken(stored)
		} else {
			localStorage.removeItem('token')
			setToken(null)
		}

		setIsLoading(false)
	}, [])

	return { token, isLoading }
}
