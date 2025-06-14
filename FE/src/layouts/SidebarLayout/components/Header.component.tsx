import React from "react";
import { useMatches } from "react-router-dom";

export default React.memo(function Header(): React.JSX.Element {
    const matches = useMatches()
    const data = matches[matches.length - 1] as { handle?: { title?: string, rightHeadContent?: React.ReactElement } }
    return <header className="w-full sticky bg-white h-max p-4 ">
        <div className="flex items-center justify-between">
            <h1 className="font-light text-lg">{data.handle?.title ?? "All project"}</h1>
            {
                <React.Suspense fallback={<></>}>
                    {data.handle?.rightHeadContent || <></>}
                </React.Suspense>
            }
        </div>
        <hr className="text-neutral-300 mt-4" />

    </header>
})