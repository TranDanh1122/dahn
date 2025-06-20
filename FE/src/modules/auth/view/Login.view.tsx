import React from "react";
import Input from "@components/Input.component";
import Button from "@components/Button.component";
import { useLogin } from "@auth/hooks/useLogin.hook";
import { Link, Outlet } from "react-router-dom";
import AuthForm from "@auth/components/AuthForm";
import Loading from "@components/Loading.component";
import { useTranslation } from "react-i18next";

export default function Login(): React.JSX.Element {
    const { t } = useTranslation("auth");
    const { form, onSubmit, isLoading } = useLogin();
    return (
        <>
            <AuthForm onSubmit={form.handleSubmit(onSubmit)}>
                <Input
                    {...form.register("email")}
                    type="email"
                    id="email"
                    error={form.formState.errors.email?.message}
                    label={t("label.email")}
                />
                <Input
                    {...form.register("password")}
                    type="password"
                    id="password"
                    error={form.formState.errors.password?.message}
                    label={t("label.password")}
                />
                <p className="text-sm flex justify-between w-full">
                    <span className="w-max text-slate-800">{t("label.forgot")}</span>
                    <Link
                        to="/auth/forgot-password"
                        className="text-blue-600 underline text-base font-semibold w-max">
                        {t("label.forgot_link")}
                    </Link>
                </p>
                <Button
                    disabled={!form.formState.isValid || isLoading}
                    type="submit"
                    className="bg-blue-500 mt-1 hover:bg-blue-400 disabled:bg-blue-400 text-white w-full">
                    {!isLoading && t("button.login")}
                    {isLoading && <Loading />}
                </Button>
                <p className="text-center text-sm space-y-1 font-semibold">
                    "{t("label.register_description")}"
                    <Link
                        role="link"
                        aria-label="Go to register"
                        to="/auth/register"
                        className="text-blue-600 w-full block underline text-base font-semibold">
                        {t("label.register_link")}
                    </Link>
                </p>
            </AuthForm>
            {/* OTP modal here */}
            <Outlet />
        </>
    );
}
