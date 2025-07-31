import { useEffect, useState } from 'react'
import { getProfile } from '../../api/user'

export function Profile() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getProfile()
      .then(data => setUser(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-gray-600">Loading profil...</p>
  if (error) return <p className="text-red-600">Error: {error}</p>

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-[#1B093C]">My Profile</h2>

      <div className="mb-4">
        <p className="text-gray-700 font-semibold">First name:</p>
        <p className="text-gray-900">{user.firstName}</p>
      </div>

      <div className="mb-4">
        <p className="text-gray-700 font-semibold">Last name:</p>
        <p className="text-gray-900">{user.lastName}</p>
      </div>
    </div>
  )
}
