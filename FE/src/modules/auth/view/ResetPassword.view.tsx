import React from "react";
import AuthForm from "@auth/components/AuthForm";
import Input from "@/components/Input.component";
import { useLoaderData } from "react-router-dom";
import { useResetPassword } from "../hooks/useResetPassword.hook";
import Button from "@/components/Button.component";
import Loading from "@/components/Loading.component";
import { useTranslation } from "react-i18next";
export default function ResetPassword(): React.JSX.Element {
    const { code } = useLoaderData<{ code: string }>()
    const { form, onSubmit, isLoading } = useResetPassword(code)
    const { t } = useTranslation("auth")
    return <AuthForm onSubmit={form.handleSubmit(onSubmit)}>
        <Input {...form.register("code")} type="hidden" label="" />
        <Input {...form.register("password")} type="password" id="password" error={form.formState.errors.password?.message} label={t('label.password')} />
        <Input {...form.register("confirmPassword")} type="password" id="confirmPassword" error={form.formState.errors.confirmPassword?.message} label={t('label.confirm_password')} />
        <Button disabled={!form.formState.isValid || isLoading}
            type="submit" className="bg-blue-500 mt-1 hover:bg-blue-400 disabled:bg-blue-400 text-white w-full" >
            {
                !isLoading && t('button.resetPassword')
            }
            {
                isLoading && <Loading />
            }

        </Button>
    </AuthForm>
}