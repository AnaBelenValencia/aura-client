import { useForm } from 'react-hook-form'
import { updateProfile } from '../api/user'
import { X } from 'lucide-react'

type Props = {
  user: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
  onClose: () => void
  onSuccess?: () => void
}

/**
 * EditUserModal is a modal form component that allows users to update their profile information.
*/
export function EditUserModal({ user, onClose, onSuccess }: Props) {
  // Initialize react-hook-form with default values from the user object
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }
  })

  /**
   * Handles form submission by calling the updateProfile API.
   * Closes the modal and triggers the onSuccess callback if provided.
   */
  const onSubmit = async (data: any) => {
    try {
      await updateProfile(data)
      onSuccess?.()
      onClose()
    } catch (err) {
      console.error('Error updating user:', err)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-lg"
        >
          <X />
        </button>

        <h2 className="text-xl font-bold text-[#1B093C] mb-4">Edit User</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              {...register('firstName', { required: 'First name is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              {...register('lastName', { required: 'Last name is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            {errors.lastName && <p className="text-red-600 text-sm">{errors.lastName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#1B093C] text-white px-4 py-2 rounded hover:bg-[#311e64] disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  )
}
