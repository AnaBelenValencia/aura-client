import { X } from 'lucide-react'

type Props = {
  user: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
  onClose: () => void
}

export function UserModal({ user, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-lg"
        >
          <X />
        </button>

        <h2 className="text-xl font-bold text-[#1B093C] mb-4">User Info</h2>

        <div className="space-y-2 text-sm">
          <p><span className="font-semibold">ID:</span> {user.id}</p>
          <p><span className="font-semibold">First Name:</span> {user.firstName}</p>
          <p><span className="font-semibold">Last Name:</span> {user.lastName}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
        </div>
      </div>
    </div>
  )
}
