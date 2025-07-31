/**
 * Custom fetch wrapper that includes the JWT token in the Authorization header.
 * 
 * @param input - The resource you want to fetch (URL or Request object).
 * @param options - Optional fetch configuration such as method, headers, body, etc.
 * @returns A Promise that resolves to the Response object.
 */
export async function fetchWithAuth(
  input: RequestInfo | URL,
  options: RequestInit = {}
) {
  // Retrieve the JWT token from localStorage
  const token = localStorage.getItem('token')

  // Merge existing headers with Authorization and Content-Type
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }

  // Perform the fetch with the updated headers
  return fetch(input, {
    ...options,
    headers
  })
}
