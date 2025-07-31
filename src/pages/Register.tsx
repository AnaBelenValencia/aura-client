import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterInput } from '../lib/zodSchemas'
import { registerRequest } from '../api/auth'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import auraLogo from '../assets/Logo_small_white.svg'

export function Register() {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  // Initialize react-hook-form with Zod schema for validation
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema)
  })

  /**
   * Handles the form submission, calls the register API, redirects to login page on success and displays error message on failure
   */
  const onSubmit = async (data: RegisterInput) => {
    setLoading(true)
    setErrorMessage('')
    try {
      await registerRequest(data)
      navigate('/')
    } catch (err: any) {
      setErrorMessage(err?.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#1B093C] min-h-screen flex items-center justify-center">
      <img
        src={auraLogo}
        alt="Aura Logo"
        className="absolute top-6 left-6 w-24 h-auto"
      />
      <div className="flex flex-col w-72">
        <h2 className="text-2xl font-bold mb-4 text-center text-white text-[48px]">Register</h2>

        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 text-white">First Name</label>
            <input
              type="text"
              {...register('firstName')}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.firstName && <p className="text-sm text-red-600">{errors.firstName.message}</p>}
          </div>

          <div>
            <label className="block mb-1 text-white">Last Name</label>
            <input
              type="text"
              {...register('lastName')}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.lastName && <p className="text-sm text-red-600">{errors.lastName.message}</p>}
          </div>

          <div>
            <label className="block mb-1 text-white">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block mb-1 text-white">Password</label>
            <input
              type="password"
              {...register('password')}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-[#2D3648] text-white py-2 rounded hover:bg-gray-600 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>

          <Link
            to="/"
            className="block w-full mt-2 text-center text-white py-2 hover:text-gray-400 transition"
          >
            Already have an account?
          </Link>
        </form>
      </div>
    </div>
  )
}
