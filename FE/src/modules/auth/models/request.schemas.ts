import { LATIN_CHECK_RGX, PASSWORD_REGEX } from '@/common/ults/Regex.const'
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
 * Forgot password zod schema
 */
export const ForgotPassSchema = z.object({
    email: z.coerce.string().email({ message: "Your email is not correct!" })
})

/**
 * Reset password zod schema
 */
export const ResetPassSchema = z.object({
    code: z.coerce.string(),
    password: z.coerce.string().refine((val: string) => {
        return (PASSWORD_REGEX).test(val)
    }, { message: "Password must be at least 8 characters long, including uppercase and lowercase letters, a number, and a special character. No spaces allowed" }),
    confirmPassword: z.coerce.string().refine((val: string) => {
        return (PASSWORD_REGEX).test(val)
    }, { message: "Password must be at least 8 characters long, including uppercase and lowercase letters, a number, and a special character. No spaces allowed" }),
}).refine(val => val.password === val.confirmPassword, { message: "Password and confirm password not match" })

export type ResetPassData = z.infer<typeof ResetPassSchema>

export const VerifyOTPSchema = z.object({
    otp: z.coerce.string().length(6).refine((val: string) => {
        return !LATIN_CHECK_RGX.test(val)
    }, { message: "OTP not correct format" }),
    email: z.coerce.string().email({ message: "Invalid Email" })
})
export type VerifyOTPData = z.infer<typeof VerifyOTPSchema>