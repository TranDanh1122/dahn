import { RegisterSchema } from "@/modules/auth/models";
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"


export default function Register(): React.JSX.Element {
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    })
    const onSubmit: SubmitHandler<z.infer<typeof RegisterSchema>> = (val) => {
        console.log(val);

    }
    return <>

        <form onSubmit={form.handleSubmit(onSubmit)}>
            Register form
        </form>
    </>
}