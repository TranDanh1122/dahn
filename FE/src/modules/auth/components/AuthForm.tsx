import React from "react";
interface FormProps extends React.ComponentProps<"form"> {
    children: React.ReactNode
}
export default function AuthForm({ children, className, ...props }: FormProps): React.JSX.Element {
    return <form className={`${className} space-y-3 border-t border-neutral-200 pt-10 w-full`} {...props}>
        {children}
    </form>
}