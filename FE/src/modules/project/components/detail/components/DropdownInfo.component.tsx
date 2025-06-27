import React from "react";
import LoadingComponent from "@/components/Loading.component";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right"

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
            className={`list-none!  ${isExpand && "shadow border-l border-r rounded-lg border-slate-200 hover:shadow-lg hover:shadow-slate-300"}`}>
            <summary
                className={`cursor-pointer list-none! relative 
                    ${isExpand
                        ? "border-r-0 border-l-0 border-slate-200 shadow-slate-200  rounded-b-none"
                        : "hover:shadow hover:shadow-slate-300"
                    } 
                    border border-slate-200 p-2 rounded-lg`}>
                {itemContent}
                <ChevronRight className={`size-5 text-slate-800 right-2 top-1/2 -translate-y-1/2 absolute  ${isExpand && "rotate-90"}`} />
            </summary>

            {isExpand && (<div className="mt-3 p-4">
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
