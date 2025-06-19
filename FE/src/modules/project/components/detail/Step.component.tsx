import React from "react";
interface DetailStepProps {
    children: React.ReactNode,
    active?: boolean
}
export default React.memo(
    function DetailStep({ children, active }: DetailStepProps): React.JSX.Element {
        const activeClass = React.useMemo(() => active ? "bg-slate-100" : "", [])
        return (
            <p className={`flex items-center gap-4 
                            cursor-pointer rounded-md px-3 py-2
                            border border-slate-300 
                            hover:bg-slate-100
                         ${activeClass}`}>
                {children}
            </p>
        );
    });
