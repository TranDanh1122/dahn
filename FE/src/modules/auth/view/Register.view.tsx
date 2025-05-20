import React from "react";
import Input from "@/components/Input.component";
import Button from "@/components/Button.component";
import Loading from "@/components/Loading.component"
import { useRegister } from "@/modules/auth/hooks/useRegister.hook";
import { Link } from "react-router-dom";
import AuthForm from "@auth/components/AuthForm";
export default function Register(): React.JSX.Element {

    const { form, onSubmit, isLoading } = useRegister()
    return <AuthForm onSubmit={form.handleSubmit(onSubmit)}>
        <Input {...form.register("email")} type="email" id="email" error={form.formState.errors.email?.message} label="Email" />
        <Input {...form.register("password")} type="password" id="password" error={form.formState.errors.password?.message} label="Password" />
        <Input {...form.register("confirmPassword")} type="password" id="confirmPassword" error={form.formState.errors.confirmPassword?.message} label="Confirm Password" />
        <Button disabled={!form.formState.isValid || isLoading}
            type="submit" className="bg-blue-500 mt-1 hover:bg-blue-400 disabled:bg-blue-400 text-white w-full" >
            {
                !isLoading && "Register"
            }
            {
                isLoading && <Loading />
            }

        </Button>
        <p className="text-center text-sm space-y-1 font-semibold">
            "Hmm, pretty sure I already made an account on this silly site"
            <Link aria-label="Go to login page" to="/auth/login" className="text-blue-600 w-full block underline text-base"> Take me to the login page, now! </Link>
        </p>
    </AuthForm>

}