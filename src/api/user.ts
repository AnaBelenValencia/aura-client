import { fetchWithAuth } from './fetchWithAuth'

const API_URL = import.meta.env.VITE_API_URL

export const getProfile = async () => {
  const response = await fetchWithAuth(`${API_URL}/users/profile`)
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to fetch profile')
  }
  return await response.json()
}

export const updateProfile = async (data: { firstName: string; lastName: string }) => {
  const response = await fetchWithAuth(`${API_URL}/users/profile`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error updating profile')
  }

  return await response.json()
}

export const getUsers = async () => {
  const response = await fetchWithAuth(`${API_URL}/users`)
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to fetch users')
  }
  return await response.json()
}