import React from "react";
import Input from "@/components/Input.component";
import Button from "@/components/Button.component";
import { Link } from "react-router-dom";
import AuthForm from "@auth/components/AuthForm";
import { useForgotPassword } from "@auth/hooks/useForgotPassword.hook";
import Loading from "@/components/Loading.component";
import { useTranslation } from "react-i18next";

export default function ForgotPassword(): React.JSX.Element {
    const { form, onSubmit, isLoading } = useForgotPassword()
    const { t } = useTranslation("auth")
    return <AuthForm onSubmit={form.handleSubmit(onSubmit)}>
        <Input type="email" label={t('label.email')} id="email" error={form.formState.errors.email?.message} {...form.register("email")} />
        <Button disabled={!form.formState.isValid}
            type="submit" className="bg-blue-500 mt-1 hover:bg-blue-400 disabled:bg-blue-400 text-white w-full" >
            {
                !isLoading && t('button.forgot')
            }
            {
                isLoading && <Loading />
            }
        </Button>
        <p className="text-center text-sm space-y-1 font-semibold">
            {t('label.login_description')}
            <Link role="link" aria-label="Go to login page" to="/auth/login" className="text-blue-600 w-full block underline text-base">  {t('label.login_link')} </Link>
        </p>
    </AuthForm >
}