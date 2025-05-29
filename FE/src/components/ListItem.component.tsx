import React from "react";
import { FolderPlus } from "lucide-react";
interface SquareItemProps extends React.ComponentProps<"div"> {
    img?: string,
    title?: string,
    lastUpdate?: string,
}
export default React.memo(function ListItem({ img, title, lastUpdate, onClick, className }: SquareItemProps): React.JSX.Element {
    const dateString = React.useMemo(() => {
        const date = new Date(lastUpdate ?? "")
        return `${date.toLocaleDateString()}`
    }, [lastUpdate])
    return <div onClick={(e) => onClick?.(e)}
        className={`w-full cursor-pointer hover:shadow-lg aspect-auto overflow-hidden border border-neutral-200 shadow rounded-2xl ${className}`}>
        <picture>
            <source srcSet="/images/logo.png" />
            <img src={img} alt={title ?? ""} className="object-cover w-full aspect-video max-w-[295px] max-h-[165px]" />
        </picture>
        <div className="py-2 px-5 flex items-center gap-4 border-t border-neutral-200 ">
            <div className="p-1 bg-blue-400 rounded-md w-fit">
                <FolderPlus className="size-4 text-white cursor-pointer" />
            </div>
            <div>
                <h3 className="font-medium text-sm text-neutral-600  truncate w-[180px]">{title ?? "title"}</h3>
                <p className="font-light text-sm text-neutral-300">{dateString ?? "lastUpdate"}</p>
            </div>

        </div>
    </div>
})