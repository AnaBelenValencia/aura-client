import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { editProfileSchema } from '../../lib/zodSchemas'
import type { EditProfileInput } from '../../lib/zodSchemas'
import { getProfile, updateProfile } from '../../api/user'

export function EditProfile() {
  const [loading, setLoading] = useState(true)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<EditProfileInput>({
    resolver: zodResolver(editProfileSchema)
  })

  useEffect(() => {
    getProfile()
      .then(data => {
        setValue('firstName', data.firstName)
        setValue('lastName', data.lastName)
      })
      .catch(err => setSubmitError(err.message))
      .finally(() => setLoading(false))
  }, [setValue])

  const onSubmit = async (data: EditProfileInput) => {
    setSubmitError('')
    setSubmitSuccess('')

    try {
      await updateProfile(data)
      setSubmitSuccess('Profile updated successfully!')
    } catch (err: any) {
      setSubmitError(err.message)
    }
  }

  if (loading) return <p className="text-gray-600">Loading profile...</p>
  if (submitError && !errors.firstName && !errors.lastName)
    return <p className="text-red-600">Error: {submitError}</p>

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-[#1B093C]">Edit Profile</h2>

      {submitSuccess && <p className="text-green-600 mb-4">{submitSuccess}</p>}
      {submitError && <p className="text-red-600 mb-4">{submitError}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            {...register('firstName')}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.firstName && (
            <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            {...register('lastName')}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.lastName && (
            <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>
          )}
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
  )
}
