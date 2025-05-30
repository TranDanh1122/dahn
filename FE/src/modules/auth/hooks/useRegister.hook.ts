import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { RegisterSchema } from "@auth/models";
import { useRegisterSvc } from "@auth/flows/ropc/ropc.service";
import { useNavigate } from "react-router-dom"
export const useRegister = () => {
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        },
        mode: "all"
    })
    const navigate = useNavigate()
    const register = useRegisterSvc()
    const onSubmit: SubmitHandler<z.infer<typeof RegisterSchema>> = (val) => {
        register.mutate(val, {
            onSuccess: (_, values) => {
                navigate("/auth/register/2fa", { state: { email: values.email } })
            }
        })
    }
    return { form, onSubmit, isLoading: register.isPending }
}