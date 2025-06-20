import React from "react";
import Eye from "lucide-react/dist/esm/icons/eye"
import EyeClosed from "lucide-react/dist/esm/icons/eye-closed"
export interface InputProps extends React.ComponentProps<"input"> {
    error?: string;
    label?: string;
    children?: React.ReactNode,
    fieldsetClass?: string,
    labelClass?: string
}
/**
 * Custom Input component
 */
export default React.memo(function Input({ fieldsetClass, labelClass, error, label, className, children, ...props }: InputProps) {
    const [isShowPass, setShowPass] = React.useState<boolean>(false)
    return (
        <fieldset className={`flex flex-col gap-2 ${fieldsetClass}`}>
            {label && <label className={`font-semibold text-slate-600 cursor-pointer text-sm ${labelClass}`} htmlFor={props.id} aria-label={label} >
                {label}
            </label>}
            <div className="relative w-full">
                <input {...props} type={isShowPass ? "text" : props.type} className={` ${className} ${props.type == "password" ? "pr-10" : ""} placeholder:text-sm text-sm w-full cursor-pointer border border-slate-200 font-medium px-3 py-2 focus-visible:outline-0 focus-visible:border-blue-300 rounded-xl`} />
                {
                    props.type == "password" && <div className="size-5 text-slate-400 top-1/2 right-4 -translate-y-1/2 absolute" onClick={() => setShowPass((val: boolean) => !val)}>
                        {isShowPass && <Eye />}
                        {!isShowPass && <EyeClosed />}
                    </div>
                }
                {children && children}
            </div>
            {error && <p className="text-red-600 text-sm font-semibold w-full text-left" aria-label={error} aria-live="assertive">{error}</p>}
        </fieldset >
    );
})
