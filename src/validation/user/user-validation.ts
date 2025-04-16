import z from 'zod'

export const userValidation = z.object({
  email: z.string().email('Invalid email format'),
  fullName: z
    .string()
    .min(3, 'full name must be at least 3 characters')
    .max(24, 'full name cannot exceed 24 characters'),
  password: z.string().min(6, 'full name must be at least 6 characters'),
  userName: z
    .string()
    .min(5, 'full name must be at least 5 characters')
    .max(30, 'full name cannot exceed 30 characters')
    .regex(/^[a-zA-Z0-9._]+$/, 'Username can only contain letters, numbers, underscores, and dots'),
  location: z
    .string()
    .min(3, 'full name must be at least 3 characters')
    .max(100, 'full name cannot exceed 100 characters')
    .regex(
      /^[a-zA-Z\s\-']+$/,
      'Location can only contain letters, spaces, hyphens, and apostrophes',
    ),
  gender: z.enum(['male', 'female', 'error!']),

  dob: z.preprocess(
    (val) => {
      if (typeof val === 'string' || val instanceof Date) {
        const parsed = new Date(val)
        return isNaN(parsed.getTime()) ? undefined : parsed
      }
      return undefined
    },
    z.date().refine((d) => d < new Date(), {
      message: 'enter your DOB man',
    }),
  ),
})
