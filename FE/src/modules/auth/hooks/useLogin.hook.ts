import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { LoginSchema, type AuthRequestData } from "@auth/models";
import { useLoginSvc } from "@auth/flows/ropc/ropc.service";
import { useNavigate } from "react-router-dom";
export const useLogin = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        defaultValues: { email: "", password: "" },
        resolver: zodResolver(LoginSchema),
        mode: "all"
    })
    const login = useLoginSvc()
    const navigate = useNavigate()
    const onSubmit = (values: AuthRequestData) => {

        login.mutate(values, {
            onSuccess: (_, values) => {
                navigate("/auth/login/2fa", { replace: true, state: { from: "/auth/login", email: values.email } })
            }
        })
    }
    return { form, onSubmit, isLoading: login.isPending }
}