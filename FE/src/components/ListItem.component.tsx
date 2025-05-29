import React from "react";
import { FolderPlus } from "lucide-react";
interface SquareItemProps extends React.ComponentProps<"div"> {
    img?: string,
    title?: string,
    lastUpdate?: string,
}
export default React.memo(function ListItem({ img, title, lastUpdate, onClick, className }: SquareItemProps): React.JSX.Element {
    return <div onClick={(e) => onClick?.(e)} className={`w-full cursor-pointer hover:shadow-lg aspect-auto overflow-hidden shadow rounded-lg ${className}`}>
        <picture>
            <source srcSet="/images/logo.png" />
            <img src={img} alt={title ?? ""} className="object-cover w-full aspect-video max-w-[295px] max-h-[165px]" />
        </picture>
        <div className="py-2 px-5 flex items-center gap-4 ">
            <div className="p-1 bg-blue-500 rounded-md w-fit">
                <FolderPlus className="size-4 text-white cursor-pointer" />
            </div>
            <div>
                <h3 className="font-medium text-sm text-neutral-600  truncate w-[180px]">{title ?? "titlaaaaaaaaaaaaaaaaaazzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzaaaaaaaaaaaaaaaaaae"}</h3>
                <p className="font-light text-sm text-neutral-300">{lastUpdate ?? "lastUpdate"}</p>
            </div>

        </div>
    </div>
})