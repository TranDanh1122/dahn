import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { RegisterSchema } from "@auth/models";
import { useRegisterSvc } from "@auth/flows/ropc/ropc.service";

export const useRegister = () => {
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    })
    const register = useRegisterSvc()
    const onSubmit: SubmitHandler<z.infer<typeof RegisterSchema>> = (val) => {
        register.mutate(val, {
            onSuccess: (data) => {
                console.log("A", data)
            },
            onError: (e: Error) => {
                throw new Error(e.message)
            }
        })
    }
    return { form, onSubmit }
}