import React from "react";
interface DetailStepProps extends React.ComponentProps<"p"> {
    children: React.ReactNode,
    active?: boolean
}
export default React.memo(
    function DetailStep({ children, active, ...props }: DetailStepProps): React.JSX.Element {
        const activeClass = React.useMemo(() => active ? "bg-slate-100" : "", [active])
        return (
            <p {...props}
                className={`flex items-center gap-4 text-sm
                            cursor-pointer rounded-md px-3 py-2
                            border border-slate-300 
                            hover:bg-slate-100 w-full
                         ${activeClass}`}>
                {children}
            </p>
        );
    });
