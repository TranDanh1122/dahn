import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { LoginSchema, type AuthRequestData } from "@auth/models/request.schemas";
import { useLoginSvc } from "@auth/flows/ropc/ropc.service";
export const useLogin = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        defaultValues: { email: "", password: "" },
        resolver: zodResolver(LoginSchema)
    })
    const login = useLoginSvc()
    const onSubmit = (values: AuthRequestData) => {
        login.mutate(values, {
            onSuccess: (res) => {
                console.log(res)
            },
            onError: (e: Error) => {
                throw new Error(e.message)
            }
        })
    }
    return { form, onSubmit }
}