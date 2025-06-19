import React from "react";
interface DetailStepProps {
    children: React.ReactNode,
    active?: boolean
}
export default React.memo(
    function DetailStep({ children, active }: DetailStepProps): React.JSX.Element {
        const activeClass = React.useMemo(() => active ? "bg-slate-100" : "", [])
        return (
            <p className={`cursor-pointer hover:underline hover:underline-offset-2 rounded-md
                        border border-slate-300 px-3 py-2 ${activeClass} hover:bg-slate-100`}>
                {children}
            </p>
        );
    });
