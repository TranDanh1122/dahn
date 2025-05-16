import React from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useRegister } from "@auth/hooks/useRegister";
import { Link } from "react-router-dom";

export default function Register(): React.JSX.Element {

    const { form, onSubmit } = useRegister()

    return <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 border-t border-neutral-200 pt-10 w-full">
        <Input {...form.register("email")} type="email" id="email" error={form.formState.errors.email?.message} label="Email" />
        <Input {...form.register("password")} type="password" id="password" error={form.formState.errors.password?.message} label="Password" />
        <Input {...form.register("confirmPassword")} type="password" id="confirmPassword" error={form.formState.errors.confirmPassword?.message} label="Confirm Password" />
        <Button disabled={!form.formState.isValid}
            type="submit" className="bg-blue-500 mt-1 hover:bg-blue-400 disabled:bg-blue-400 text-white w-full" >
            Register
        </Button>
        <p className="text-center text-sm space-y-1 font-semibold">
            "Hmm, pretty sure I already made an account on this silly site"
            <Link to="/auth/login" className="text-blue-600 w-full block underline text-base"> Take me to the login page, now! </Link>
        </p>
    </form>

}