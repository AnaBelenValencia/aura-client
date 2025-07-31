import { z } from 'zod'

/**
 * Schema used to validate login form input.
 */
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

// Type derived from loginSchema for use in forms or API calls
export type LoginInput = z.infer<typeof loginSchema>

/**
 * Schema used to validate registration form input.
 */
export const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

// Type derived from registerSchema for form handling and type safety
export type RegisterInput = z.infer<typeof registerSchema>

/**
 * Schema used to validate profile update form.
 */
export const editProfileSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required')
})

// Type derived from editProfileSchema for use in profile update logic
export type EditProfileInput = z.infer<typeof editProfileSchema>