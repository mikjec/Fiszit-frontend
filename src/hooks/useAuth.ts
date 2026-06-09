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

export const useAuth = (): string | null => {
	const token = localStorage.getItem('token')

	if (token && !isTokenExpired(token)) {
		return token
	}

	localStorage.removeItem('token')
	return null
}
