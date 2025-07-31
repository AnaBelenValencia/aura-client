import type { LoginInput, RegisterInput } from '../lib/zodSchemas'

const API_URL = import.meta.env.VITE_API_URL

export const registerRequest = async (data: RegisterInput) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Registration failed')
  }

  return await response.json()
}

export const loginRequest = async (data: LoginInput) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Login failed')
  }

  return await response.json()
}
