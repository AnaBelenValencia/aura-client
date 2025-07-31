import { useEffect, useState } from 'react'
import { getUsers } from '../../api/user'
import { SideBar } from '../../components/SideBar'
import { Eye, Pencil } from 'lucide-react'
import { UserModal } from '../../components/UserModal'
import { EditUserModal  } from '../../components/EditUserModal'

export function Users() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedUser, setSelectedUser] = useState<any | null>(null)
  const [editUser, setEditUser] = useState<any | null>(null)

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-gray-600">Loading users...</p>
  if (error) return <p className="text-red-600">Error: {error}</p>

  return (
    <div className="min-h-screen flex bg-gray-100">
      <SideBar />
      {selectedUser && (
        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
      {editUser && (
        <EditUserModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSuccess={() => {
            getUsers().then(setUsers)
          }}
        />
      )}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-[#1B093C] mb-6">Users List</h2>
        <div className="w-full flex justify-center overflow-x-auto">
          <table className="min-w-[600px] table-auto text-left">
            <thead className="bg-[#1B093C] text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  Actions
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  First Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  Last Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-3">
                    <button
                      className="text-[#1B093C] px-3 py-1 text-sm rounded hover:text-gray-400 transition"
                      onClick={() => setSelectedUser(user)}
                    >
                      <Eye />
                    </button>
                    <button
                      className="text-[#1B093C] px-3 py-1 text-sm rounded hover:text-gray-400 transition"
                      onClick={() => setEditUser(user)}
                    >
                      <Pencil />
                    </button>
                  </td>
                  <td className="px-6 py-3">{user.firstName}</td>
                  <td className="px-6 py-3">{user.lastName}</td>
                  <td className="px-6 py-3">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
