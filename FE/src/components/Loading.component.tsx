import React from "react"
/**
 * Local Loading component - used for loading data of unit component
 * 
 * @param className --> className of the loading component
 * 
 * @returns 
 * 
 */
export default React.memo(function Loading(props: React.ComponentProps<"div">): React.JSX.Element {
    return <div className={`size-5 border-s-2 border-white rounded-full animate-spin ${props.className} mx-auto`}></div>
})