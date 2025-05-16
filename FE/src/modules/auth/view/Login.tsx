import React from "react";
import SocialAuth from "@auth/components/SocialAuth";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useLogin } from "@auth/hooks/useLogin";
export default function Login(): React.JSX.Element {
    const { form, onSubmit } = useLogin()
    return <div className="space-y-10">
        <SocialAuth />
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 border-t border-neutral-200 pt-10 w-full">
            <Input {...form.register("email")} type="email" id="email" error={form.formState.errors.email?.message} label="Email" />
            <Input {...form.register("password")} type="password" id="password" error={form.formState.errors.password?.message} label="Password" />
            <Button disabled={!form.formState.isValid}
                type="submit" className="bg-blue-500 mt-1 hover:bg-blue-400 disabled:bg-blue-400 text-white w-full" >
                Login
            </Button>
        </form>
    </div>
}