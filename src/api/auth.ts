import type { LoginInput, RegisterInput } from '../lib/zodSchemas'

const API_URL = import.meta.env.VITE_API_URL

/**
 * Sends a POST request to register a new user.
 * 
 * @param data - The user registration data (validated with Zod schema).
 * @returns The parsed JSON response from the API.
 * @throws An error if the registration fails or the response is not OK.
 */
export const registerRequest = async (data: RegisterInput) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  // If the response is not successful, throw an error with a message from the server
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Registration failed')
  }

  // Return the successful response body as JSON
  return await response.json()
}

/**
 * Sends a POST request to log in a user.
 * 
 * @param data - The user login credentials (validated with Zod schema).
 * @returns The parsed JSON response from the API, typically including a JWT token.
 * @throws An error if the login fails or the response is not OK.
 */
export const loginRequest = async (data: LoginInput) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  // If the response is not successful, throw an error with a message from the server
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Login failed')
  }

  // Return the successful response body as JSON
  return await response.json()
}
