import Button from "@components/Button.component";
import Input from "@components/Input.component";
import React from "react";
import useLoginOTP from "@auth/hooks/useLoginOTP.hook";
import Loading from "@components/Loading.component";
import { Navigate } from "react-router-dom";

const OTPModal = React.memo((): React.JSX.Element => {
    const hookData = useLoginOTP();
    if (!hookData) return <Navigate to={"/auth/login"} />;
    const { form, onSubmit, handleResend, resendPending, wait, submitPending } =
        hookData;

    return (
        <div className="fixed w-screen h-screen bg-black/20 top-0 left-0 flex items-center justify-center">
            <form
                role="form"
                onSubmit={form.handleSubmit(onSubmit, (e) => console.log(e))}
                className="bg-white w-full md:w-1/2 lg:w-1/3 mx-2 sm:mx-0 rounded-2xl p-3 shadow-lg shadow-slate-700">
                <h1 className="font-bold text-slate-900 text-center text-2xl">
                    OTP VERIFY
                </h1>
                <h2 className="text-slate-800 text-center">
                    Plese verify you email, my gf cheated me, so i dont trust people any
                    more
                </h2>
                <p className="font-light text-center">
                    We sent the code to you email, let copy it and input here!
                </p>
                <Input
                    label=""
                    {...form.register("otp")}
                    error={form.formState.errors.otp?.message}
                    className="tracking-[20px] uppercase font-bold text-3xl text-center mt-6"
                />
                <div className="flex items-center justify-between mt-6">
                    <Button
                        onClick={handleResend}
                        disabled={wait != 0}
                        type="button"
                        className="underline font-light cursor-pointer">
                        {resendPending && (
                            <Loading className="size-5 border-s-slate-500!" />
                        )}
                        {!resendPending && (
                            <> Resend OTP {wait != 0 && `(available in: ${wait} )`} </>
                        )}
                    </Button>
                    <Button
                        type="submit"
                        className="bg-blue-500 text-white cursor-pointer">
                        {submitPending && <Loading />}
                        {!submitPending && <> Submit </>}
                    </Button>
                </div>
            </form>
        </div>
    );
});
export default OTPModal;
