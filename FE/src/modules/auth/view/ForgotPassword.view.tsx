import React from "react";
import Input from "@/components/Input.component";
import Button from "@/components/Button.component";
import { Link } from "react-router-dom";
import AuthForm from "@auth/components/AuthForm";
import { useForgotPassword } from "@/modules/auth/hooks/useForgotPassword.hook";
export default function ForgotPassword(): React.JSX.Element {
    const { form, onSubmit } = useForgotPassword()

    return <AuthForm onSubmit={form.handleSubmit(onSubmit)}>
        <Input type="email" label="Email" id="email" error={form.formState.errors.email?.message} {...form.register("email")} />
        <Button disabled={!form.formState.isValid}
            type="submit" className="bg-blue-500 mt-1 hover:bg-blue-400 disabled:bg-blue-400 text-white w-full" >
            Request reset password
        </Button>
        <p className="text-center text-sm space-y-1 font-semibold">
            "Hmm, pretty sure I already made an account on this silly site"
            <Link aria-label="Go to login page" to="/auth/login" className="text-blue-600 w-full block underline text-base"> Take me to the login page, now! </Link>
        </p>
    </AuthForm >
}