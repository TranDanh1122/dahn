import { ForgotPassSchema } from "@auth/models";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForgotPasswordSvc } from "@auth/flows/ropc/ropc.service";
export const useForgotPassword = () => {
    const form = useForm<z.infer<typeof ForgotPassSchema>>({
        defaultValues: { email: "" },
        resolver: zodResolver(ForgotPassSchema)
    })
    const forgotPass = useForgotPasswordSvc()
    const onSubmit = (values: z.infer<typeof ForgotPassSchema>) => {
        forgotPass.mutate(values, {
            onError: (e) => {
                throw new Error(e.message)
            }
        })
    }
    return { form, onSubmit, isLoading : forgotPass.isPending }
}