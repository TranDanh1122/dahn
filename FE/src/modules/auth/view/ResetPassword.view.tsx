import React from "react";
import AuthForm from "@auth/components/AuthForm";
import Input from "@/components/Input.component";
import { useLoaderData } from "react-router-dom";
import { useResetPassword } from "../hooks/useResetPassword.hook";
import Button from "@/components/Button.component";
export default function ResetPassword(): React.JSX.Element {
    const ticket = useLoaderData<string>()
    const { form, onSubmit } = useResetPassword(ticket)
    return <AuthForm onSubmit={form.handleSubmit(onSubmit)}>
        <Input {...form.register("ticket")} type="hidden" label="" />
        <Input {...form.register("password")} type="password" id="password" error={form.formState.errors.password?.message} label="Password" />
        <Input {...form.register("confirmPassword")} type="password" id="confirmPassword" error={form.formState.errors.confirmPassword?.message} label="Confirm Password" />
        <Button disabled={!form.formState.isValid}
            type="submit" className="bg-blue-500 mt-1 hover:bg-blue-400 disabled:bg-blue-400 text-white w-full" >
            Reset Password
        </Button>
    </AuthForm>
}