import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),

  email: z
    .string()
    .email('Please enter a valid email address'),

  phone: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true
      // Basic UK phone validation (optional)
      return /^(\+44|0)?\d{10,11}$/.test(val.replace(/\s/g, ''))
    }, 'Please enter a valid UK phone number'),

  company: z
    .string()
    .max(100, 'Company name must not exceed 100 characters')
    .optional(),

  service: z
    .string()
    .min(1, 'Please select a service'),

  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must not exceed 1000 characters'),

  budget: z
    .string()
    .optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export const serviceOptions = [
  { value: 'business-support', label: 'Business Support' },
  { value: 'digital-marketing', label: 'Digital Marketing' },
  { value: 'grant-consultancy', label: 'Grant Consultancy' },
  { value: 'other', label: 'Other' },
] as const

export const budgetOptions = [
  { value: 'under-1k', label: 'Under £1,000' },
  { value: '1k-5k', label: '£1,000 - £5,000' },
  { value: '5k-10k', label: '£5,000 - £10,000' },
  { value: '10k-plus', label: '£10,000+' },
  { value: 'discuss', label: 'Let\s discuss' },
] as const