import { z } from 'zod'

export const zodViErrorMap = (issue: any) => {
  switch (issue.code) {
    case 'invalid_type':
      if (issue.input === undefined || issue.received === 'null' || issue.received === 'NaN')
        return { message: `Không được bỏ trống` }
      return { message: `Trường này phải là kiểu ${issue.expected}` }
    case 'unrecognized_keys':
      return { message: `Có trường không hợp lệ` }
    case 'invalid_union':
    case 'invalid_format':
      return { message: `Giá trị không hợp lệ trong hàm` }
    case 'too_small':
      return {
        message:
          issue.type === 'string'
            ? `Phải có ít nhất ${issue.minimum} ký tự`
            : `Giá trị phải ≥ ${issue.minimum}`,
      }
    case 'too_big':
      return {
        message:
          issue.type === 'string'
            ? `Không được vượt quá ${issue.maximum} ký tự`
            : `Giá trị phải ≤ ${issue.maximum}`,
      }
    case 'custom':
    default:
      return { message: issue.message }
  }
}

z.config({ customError: zodViErrorMap })

export { z }
