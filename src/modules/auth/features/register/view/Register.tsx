import { RegisterSchema } from "@/modules/auth/models";
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useRegister } from "@auth/services/auth.service";


export default function Register(): React.JSX.Element {
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    })
    const register = useRegister()
    const onSubmit: SubmitHandler<z.infer<typeof RegisterSchema>> = (val) => {
        register.mutate(val, {
            onSuccess: (data) => {
                console.log("A", data)
            }
        })
    }
    return <>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 border-t border-neutral-200 pt-8">
            <Input {...form.register("email")} type="email" id="email" error={form.formState.errors.email?.message} label="Email" />
            <Input {...form.register("password")} type="password" id="password" error={form.formState.errors.password?.message} label="Password" />
            <Input {...form.register("confirmPassword")} type="password" id="confirmPassword" error={form.formState.errors.confirmPassword?.message} label="Confirm Password" />
            <Button disabled={!form.formState.isValid}
                type="submit" className="bg-blue-500 mt-1 hover:bg-blue-400 disabled:bg-blue-400 text-white w-full" >
                Register
            </Button>
        </form>
    </>
}