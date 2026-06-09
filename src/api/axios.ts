// src/api/axios.js
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'

// Tworzymy instancję axiosa
const api = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL}/api`, // adres Twojego Expressa
})

// Interceptor - automatycznie dodaje token do KAŻDEGO zapytania
api.interceptors.request.use(
	config => {
		const token = useAuth() // Wyciągasz token

		if (token) {
			config.headers.Authorization = `Bearer ${token}` // Doklejasz go
		}

		return config
	},
	error => {
		return Promise.reject(error)
	},
)

export default api
