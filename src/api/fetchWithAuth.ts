export async function fetchWithAuth(
  input: RequestInfo | URL,
  options: RequestInit = {}
) {
  const token = localStorage.getItem('token')

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }

  return fetch(input, {
    ...options,
    headers
  })
}
