import { z } from './zod-vi-error-map'
export const ZCurrentPasswordSchema = z.string().max(72)

export const ZPasswordSchema = z
  .string()
  .regex(new RegExp('.*[A-Z].*'), { message: 'Phải có một ký tự in hoa' })
  .regex(new RegExp('.*[a-z].*'), { message: 'Phải có một ký tự thường' })
  .min(8)
  .max(72)

const vietnamPhoneRegex = /^(0|\+84)(3[2-9]|5[2689]|7[06-9]|8[1-689]|9[0-9])[0-9]{7}$/

export const ZPhoneSchema = z.string().regex(vietnamPhoneRegex, {
  message: 'Số điện thoại không hợp lệ',
})
