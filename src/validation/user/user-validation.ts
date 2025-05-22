import z from 'zod'

export const userValidation = z.object({
  email: z.string({ required_error: 'Email is required' }).email('Invalid email format'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters'),
  userName: z
    .string({ required_error: 'userName is required' })
    .min(5, 'userName must be at least 5 characters')
    .max(30, 'userName cannot exceed 30 characters')
    .regex(/^[a-zA-Z0-9._]+$/, 'Username can only contain letters, numbers, underscores, and dots'),
})
