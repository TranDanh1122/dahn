import { PASSWORD_REGEX } from '@/common/Regex.const'
import { z } from 'zod'
/**
 * Register zod schema
 */
export const RegisterSchema = z.object({
    email: z.coerce.string().email({ message: "Your email is not correct!" }),
    password: z.coerce.string().refine((val: string) => {
        return (PASSWORD_REGEX).test(val)
    }, { message: "Password must be at least 8 characters long, including uppercase and lowercase letters, a number, and a special character. No spaces allowed" }),
    confirmPassword: z.coerce.string()
}).refine((val) => {
    return val.password === val.confirmPassword
}, { message: "Password and confirm password not match" })

/**
 * Send Auth Request Data Type
 */
export type AuthRequestData = Omit<z.infer<typeof RegisterSchema>, 'confirmPassword'>

/**
 * Login zod schema
 */
export const LoginSchema = z.object({
    email: z.coerce.string().email({ message: "Your email is not correct!" }),
    password: z.coerce.string().refine((val: string) => {
        return (PASSWORD_REGEX).test(val)
    }, { message: "Password must be at least 8 characters long, including uppercase and lowercase letters, a number, and a special character. No spaces allowed" })
})


/**
 * Reset password zod schema
 */
export const ForgotPassSchema = z.object({
    email: z.coerce.string().email({ message: "Your email is not correct!" })
})