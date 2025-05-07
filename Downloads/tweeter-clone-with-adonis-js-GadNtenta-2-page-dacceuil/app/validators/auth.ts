import vine from '@vinejs/vine'

// Validator for user registration
export const registerValidator = vine.object({
  fullName: vine.string().trim().minLength(2).maxLength(50),
  email: vine.string().trim().email().normalizeEmail(),
  password: vine
    .string()
    .trim()
    .minLength(8)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .regex(/[^A-Za-z0-9]/),
  username: vine
    .string()
    .trim()
    .minLength(3)
    .maxLength(30)
    .regex(/^[a-zA-Z0-9_]+$/),
})

// Validator for user login
export const loginValidator = vine.object({
  email: vine.string().email().normalizeEmail(),
  password: vine
    .string()
    .minLength(1)
    .transform((value) => {
      console.log('Validation du mot de passe:', value ? '[PRÉSENT]' : '[ABSENT]')
      return value
    }),
})

export const resetPasswordValidator = vine.object({
  email: vine.string().email().normalizeEmail(),
})

export const updatePasswordValidator = vine.object({
  password: vine.string().minLength(8),
  passwordConfirmation: vine.string().confirmed({ confirmationField: 'password' }),
})
