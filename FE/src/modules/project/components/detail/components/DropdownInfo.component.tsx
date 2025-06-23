import React from "react";
import LoadingComponent from "@/components/Loading.component";
interface DropdownInforProps extends React.ComponentProps<"details"> {
    itemContent: React.ReactElement;
    dropContent: React.ReactElement;
}
export default React.memo(function DropdownInfor({ itemContent, dropContent, ...props }: DropdownInforProps): React.JSX.Element {
    const [isExpand, setExpanded] = React.useState<boolean>(false);
    const handleToggle = (e: React.SyntheticEvent<HTMLDetailsElement>) => {
        const expanded = e.currentTarget.open;
        setExpanded(expanded);
    };
    return (
        <details
            onToggle={handleToggle}
            {...props}
            className={`list-none!  ${isExpand && "shadow border-l border-r rounded-lg border-slate-200"}`}>
            <summary className={`cursor-pointer list-none! 
                    ${isExpand && "border-r-0 border-l-0 border-slate-200 shadow-slate-200  rounded-b-none"} 
                    border border-slate-200 p-2 rounded-lg`}>
                {itemContent}
            </summary>

            {isExpand && (<div className="mt-6 p-4">
                <React.Suspense
                    fallback={
                        <LoadingComponent className="border-s border-s-slate-600" />
                    }>
                    {dropContent}
                </React.Suspense>
            </div>
            )}
        </details>
    );
});
