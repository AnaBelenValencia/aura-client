import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { LoginInput } from '../lib/zodSchemas'
import { loginSchema } from '../lib/zodSchemas'
import { loginRequest } from '../api/auth'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export function Login() {
  const navigate = useNavigate()

  // Local state for error messages and loading spinner
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  // Initialize react-hook-form with Zod validation schema
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema)
  })

  /**
   * Handles login form submission, sends login request to backend, saves token and redirects to dashboard
   */
  const onSubmit = async (data: LoginInput) => {
    setLoading(true)
    setErrorMessage('')
    try {
      const result = await loginRequest(data)
      localStorage.setItem('token', result.token)
      navigate('/dashboard/profile')
    } catch (err: any) {
      setErrorMessage(err?.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm p-6 rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-white text-[48px]">Welcome</h2>

      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{errorMessage}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 text-white">User</label>
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
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#2D3648] text-white py-2 rounded hover:bg-gray-600 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Continue'}
        </button>

        <Link
          to="/register"
          className="block w-full mt-2 text-center text-white py-2 hover:text-gray-400 transition"
        >
          Create an account
        </Link>
      </form>
    </div>
  )
}
