import React from "react";
import { Eye, EyeClosed } from "lucide-react"
interface InputProps extends React.ComponentProps<"input"> {
    error?: string;
    label: string;
}
export default function Input({ error, label, className, ...props }: InputProps) {
    const [isShowPass, setShowPass] = React.useState<boolean>(false)
    return (
        <fieldset className="flex flex-col gap-2">
            <label className="font-semibold text-neutral-600 cursor-pointer" htmlFor={props.id}>
                {label}
            </label>
            <div className="relative w-full">
                <input {...props} type={isShowPass ? "text" : props.type} className={` ${className} ${props.type == "password" ? "pr-10" : ""} w-full cursor-pointer border border-neutral-200 font-medium px-3 py-2 focus-visible:outline-0 focus-visible:border-fuchsia-300 rounded-xl`}  />
                {
                    props.type == "password" && <div className="size-5 text-neutral-400 top-1/2 right-4 -translate-y-1/2 absolute" onClick={() => setShowPass((val:boolean) => !val)}>
                        {isShowPass && <Eye />}
                        {!isShowPass && <EyeClosed />}
                    </div>
                }

            </div>
            {error && <p className="text-red-600 text-sm font-semibold w-full text-left" aria-label="validate error">{error}</p>}
        </fieldset >
    );
}
