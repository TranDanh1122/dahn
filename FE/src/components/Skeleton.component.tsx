import React from "react";

export default React.memo(function Skeleton({ className }: React.ComponentProps<"div">): React.JSX.Element {

    return <div className={`${className} animate-pulse`}></div>
})
