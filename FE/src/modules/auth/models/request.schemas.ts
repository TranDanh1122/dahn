import { PASSWORD_REGEX } from '@/common/Regex.const'
import { z } from 'zod'
export const RegisterSchema = z.object({
    email: z.coerce.string().email({ message: "Your email is not correct!" }),
    password: z.coerce.string().refine((val: string) => {
        return (PASSWORD_REGEX).test(val)
    }, { message: "Password must be at least 8 characters long, including uppercase and lowercase letters, a number, and a special character. No spaces allowed" }),
    confirmPassword: z.coerce.string()
}).refine((val) => {
    return val.password === val.confirmPassword
}, { message: "Password and confirm password not match" })
export type RegisterData = Omit<z.infer<typeof RegisterSchema>, 'confirmPassword'>