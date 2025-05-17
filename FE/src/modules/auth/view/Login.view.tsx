import React from "react";
import Input from "@/components/Input.component";
import Button from "@/components/Button.component";
import { useLogin } from "@/modules/auth/hooks/useLogin.hook";
import { Link } from "react-router-dom"
import AuthForm from "@auth/components/AuthForm";
import Loading from "@/components/Loading.component";

export default function Login(): React.JSX.Element {
    const { form, onSubmit, isLoading } = useLogin()
    return <AuthForm onSubmit={form.handleSubmit(onSubmit)}>

        <Input {...form.register("email")} type="email" id="email" error={form.formState.errors.email?.message} label="Email" />
        <Input {...form.register("password")} type="password" id="password" error={form.formState.errors.password?.message} label="Password" />
        <p className="text-sm flex justify-between w-full">
            <span className="w-max">
                Dude, forgot your password again?
            </span>
            <Link to="/auth/forgot-password" className="text-blue-600 underline text-base font-semibold w-max"> Reset it! </Link></p>
        <Button disabled={!form.formState.isValid || isLoading}
            type="submit" className="bg-blue-500 mt-1 hover:bg-blue-400 disabled:bg-blue-400 text-white w-full" >
            {
                !isLoading && "Login"
            }
            {
                isLoading && <Loading />
            }

        </Button>
        <p className="text-center text-sm space-y-1 font-semibold">
            "First time?"
            <Link aria-label="Go to register" to="/auth/register" className="text-blue-600 w-full block underline text-base font-semibold"> Click here newbie!</Link>
        </p>

    </AuthForm>

}