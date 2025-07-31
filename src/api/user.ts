import { fetchWithAuth } from './fetchWithAuth'

// Get the base API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL

/**
 * Fetches the authenticated user's profile.
 * 
 * @returns The user profile data as JSON.
 * @throws An error if the request fails.
 */
export const getProfile = async () => {
  const response = await fetchWithAuth(`${API_URL}/users/profile`)
  // If the response is not OK, extract and throw the error message
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to fetch profile')
  }
  // Return the successful response body as JSON
  return await response.json()
}

/**
 * Updates the authenticated user's profile.
 * 
 * @param data - An object containing the new first and last name.
 * @returns The updated profile data as JSON.
 * @throws An error if the update fails.
 */
export const updateProfile = async (data: { firstName: string; lastName: string }) => {
  const response = await fetchWithAuth(`${API_URL}/users/profile`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // If the response is not OK, extract and throw the error message
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error updating profile')
  }

  // Return the successful response body as JSON
  return await response.json()
}

/**
 * Retrieves the list of all users (admin or privileged route).
 * 
 * @returns An array of user objects as JSON.
 * @throws An error if the request fails.
 */
export const getUsers = async () => {
  const response = await fetchWithAuth(`${API_URL}/users`)
  // If the response is not OK, extract and throw the error message
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to fetch users')
  }

  // Return the list of users as JSON
  return await response.json()
}