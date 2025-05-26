import React from "react"

interface TextAreaProps extends React.ComponentProps<"textarea"> {
    children?: React.ReactNode,
    label: string,
    error?: string,
    labelClass?: string,
}

export default React.memo(function TextArea({ labelClass, error, label, children, className, ...props }: TextAreaProps): React.JSX.Element {
    return <fieldset className="flex flex-col gap-2">
        <label className={`font-semibold text-neutral-600 cursor-pointer ${labelClass}`} htmlFor={props.id} aria-label={label} >
            {label}
        </label>
        <div className="relative w-full">
            <textarea {...props} className={` ${className} w-full cursor-pointer border border-neutral-200 font-medium px-3 py-2 focus-visible:outline-0 focus-visible:border-fuchsia-300 rounded-xl`} />
            {children && children}
        </div>
        {error && <p className="text-red-600 text-sm font-semibold w-full text-left" aria-label={error} aria-live="assertive">{error}</p>}
    </fieldset >
})