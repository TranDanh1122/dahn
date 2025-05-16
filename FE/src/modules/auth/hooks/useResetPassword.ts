import { useForm } from "react-hook-form"
import { ResetPassSchema, type ResetPassData } from "@auth/models"
import { zodResolver } from "@hookform/resolvers/zod"
import { useResetPasswordSvc } from "@auth/flows/ropc/ropc.service"
import { z } from "zod"
export const useResetPassword = (ticket: string) => {
    const form = useForm<z.infer<typeof ResetPassSchema>>({
        defaultValues: { ticket, password: "", confirmPassword: "" },
        resolver: zodResolver(ResetPassSchema)
    })
    const resetPassword = useResetPasswordSvc()
    const onSubmit = (values: ResetPassData) => {
        resetPassword.mutate(values, {
            onSuccess: (res) => {
                console.log(res);
            },
            onError: (e: Error) => {
                throw new Error(e.message)
            }
        })
    }
    return { form, onSubmit }
}