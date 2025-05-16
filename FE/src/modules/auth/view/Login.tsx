import React from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useLogin } from "@auth/hooks/useLogin";
import { Link } from "react-router-dom"
export default function Login(): React.JSX.Element {
    const { form, onSubmit } = useLogin()
    return <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 border-t border-neutral-200 pt-10 w-full">
        <Input {...form.register("email")} type="email" id="email" error={form.formState.errors.email?.message} label="Email" />
        <Input {...form.register("password")} type="password" id="password" error={form.formState.errors.password?.message} label="Password" />
        <Button disabled={!form.formState.isValid}
            type="submit" className="bg-blue-500 mt-1 hover:bg-blue-400 disabled:bg-blue-400 text-white w-full" >
            Login
        </Button>
        <p className="text-center text-sm space-y-1 font-semibold">
            "First time?"
            <Link to="/auth/register" className="text-blue-600 w-full block underline text-base font-semibold"> Click here newbie!</Link>
        </p>
    </form>

}