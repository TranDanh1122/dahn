import React from "react";
import Input from "@components/Input.component";
import Button from "@components/Button.component";
import Loading from "@components/Loading.component"
import { useRegister } from "@auth/hooks/useRegister.hook";
import { Link, Outlet } from "react-router-dom";
import AuthForm from "@auth/components/AuthForm";
import { useTranslation } from "react-i18next";
export default function Register(): React.JSX.Element {
    const { t } = useTranslation("auth")
    const { form, onSubmit, isLoading } = useRegister()
    return <>
        <AuthForm onSubmit={form.handleSubmit(onSubmit)}>
            <Input {...form.register("email")} type="email" id="email" error={form.formState.errors.email?.message} label={t("label.email")} />
            <Input {...form.register("password")} type="password" id="password" error={form.formState.errors.password?.message} label={t("label.password")} />
            <Input {...form.register("confirmPassword")} type="password" id="confirmPassword" error={form.formState.errors.confirmPassword?.message} label={t('label.confirm_password')} />
            <Button disabled={!form.formState.isValid || isLoading}
                type="submit" className="bg-blue-500 mt-1 hover:bg-blue-400 disabled:bg-blue-400 text-white w-full" >
                {
                    !isLoading && t('button.register')
                }
                {
                    isLoading && <Loading />
                }

            </Button>
            <p className="text-center text-sm space-y-1 font-semibold">
                "{t('label.login_description')}"
                <Link aria-label="Go to login page" to="/auth/login" className="text-blue-600 w-full block underline text-base">  {t('label.login_link')} </Link>
            </p>

        </AuthForm>
        {/* OTP modal here */}
        <Outlet />
    </>

}