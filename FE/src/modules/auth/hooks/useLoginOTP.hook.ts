import useTimeout from "@/common/hooks/useTimeout";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoginOTPSvc, useResendOTPSvc } from "@auth/flows/ropc/ropc.service";
import { VerifyOTPSchema, type VerifyOTPData } from "@auth/models/request.schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
export const useRouteState = () => {
    //------Check if we have email in route state
    const location = useLocation()
    if (!location.state) return null
    const { email, from } = location.state
    if (!email) return null

    return { email, from }
}
export default function useLoginOTP() {

    //-------Countdown resend
    const { wait, setDelay } = useTimeout()

    const loginOTP = useLoginOTPSvc()
    const resendOTP = useResendOTPSvc()
    const navigate = useNavigate()
    const form = useForm<VerifyOTPData>({
        defaultValues: { email: "", otp: "" },
        resolver: zodResolver(VerifyOTPSchema),
        mode: "onSubmit"
    })
    const routerData = useRouteState()
    if (!routerData) return null

    const { email } = routerData

    form.setValue("email", email)

    const onSubmit = (values: VerifyOTPData) => {
        loginOTP.mutate(values, {
            onSuccess: () => {
                navigate("/")
            }
        })
    }
    const handleResend = () => {
        if (wait == 0)
            resendOTP.mutate({ email }, {
                onSuccess: () => {
                    setDelay(1, 60)
                }
            })
    }
    return { form, onSubmit, handleResend, resendPending: resendOTP.isPending, submitPending: loginOTP.isPending, wait }
}