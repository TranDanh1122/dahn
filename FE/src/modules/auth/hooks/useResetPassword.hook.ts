import { useForm } from "react-hook-form"
import { ResetPassSchema, type ResetPassData } from "@auth/models"
import { zodResolver } from "@hookform/resolvers/zod"
import { useResetPasswordSvc } from "@auth/flows/ropc/ropc.service"
import { z } from "zod"
import { useNavigate } from "react-router-dom"
export const useResetPassword = (code: string) => {
    const form = useForm<z.infer<typeof ResetPassSchema>>({
        defaultValues: { code, password: "", confirmPassword: "" },
        resolver: zodResolver(ResetPassSchema),
        mode: "all"
    })
    const resetPassword = useResetPasswordSvc()
    const navigate = useNavigate()
    const onSubmit = (values: ResetPassData) => {
        resetPassword.mutate(values, {
            onSuccess: () => {
                navigate("/auth/login")
            }
        })
    }
    return { form, onSubmit, isLoading: resetPassword.isPending }
}