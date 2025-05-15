import React from "react";
interface InputProps extends React.ComponentProps<"input"> {
    error?: string;
    label: string;
}
export default function Input({ error, label, className, ...props }: InputProps) {
    return (
        <fieldset className="flex flex-col gap-2">
            <label className="font-semibold text-neutral-600 cursor-pointer" htmlFor={props.id}>
                {label}
            </label>
            <input className={` ${className} cursor-pointer border border-neutral-200 font-medium px-3 py-2 focus-visible:outline-0 focus-visible:border-fuchsia-300 rounded-xl`} {...props} />
            {error && <p className="text-red-600 text-sm font-semibold w-full text-left" aria-label="validate error">{error}</p>}
        </fieldset>
    );
}
