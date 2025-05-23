import { LATIN_CHECK_RGX } from "@/common/ults/Regex.const";
import Button from "@/components/Button.component";
import Input from "@/components/Input.component";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useLoginOTPSvc } from "@auth/flows/ropc/ropc.service";
import { useForm } from "react-hook-form";
import { VerifyOTPSchema, type VerifyOTPData } from "@auth/models/request.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
const OTPModal = React.memo((): React.JSX.Element => {
    const location = useLocation()
    // if (!location.state) return <Navigate to={"/auth/login"} replace />
    // const { email, form } = location.state
    // if (!email) return <Navigate to={form || "/auth/login"} replace />;

    const [wait, setWaiting] = React.useState<number>(60)

    const oneMinWaiting = () => {
        new Promise((resolve) => {
            setTimeout(resolve, 1000)
        }).then(() => {
            if (wait > 0) {
                setWaiting((prev) => prev - 1)
                oneMinWaiting()
            }
        })
    }

    const loginOTP = useLoginOTPSvc()

    const onSubmit = (values: VerifyOTPData) => {
        loginOTP.mutate({ email: "trandanh14042000@gmail.com", otp: value }, {
            onSuccess: () => {
                document.getElementById("otp-error")?.classList.add("hidden")
            }
        })
    }
    const form = useForm<VerifyOTPData>({
        defaultValues: { email: "", otp: "" },
        resolver: zodResolver(VerifyOTPSchema),
        mode: "all"
    })

    return <div className="fixed w-screen h-screen bg-black/20 top-0 left-0 flex items-center justify-center">
        <form role="form" onSubmit={form.handleSubmit(onSubmit)} className="bg-white w-full md:w-1/2 lg:w-1/3 mx-2 sm:mx-0 rounded-2xl p-3 shadow-lg shadow-neutral-700">
            <h1 className="font-bold text-neutral-900 text-center text-2xl">OTP VERIFY</h1>
            <h2 className="text-neutral-800 text-center">Plese verify you email, my gf cheated me, so i dont trust people any more</h2>
            <p className="font-light text-center">We sent the code to you email, let copy it and input here!</p>
            <Input label="" {...form.register("otp")}
                className="tracking-[20px] uppercase font-bold text-3xl text-center mt-6" />
            <div className="flex items-center justify-between mt-6">
                <Button disabled={wait == 0} type="button" className="underline font-light cursor-pointer">Resend OTP (available in: {wait})</Button>
                <Button type="submit" className="bg-blue-500 text-white cursor-pointer">Submit</Button>
            </div>
        </form>
    </div>
})
export default OTPModal