import { BreadscrumContext } from "@/context/Breadscrum.context";
import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx/lite";
export default React.memo(function Breadscrum(): React.JSX.Element {
    const { breadscrums } = React.useContext(BreadscrumContext)
    return (
        <div className="space-x-1">
            {
                breadscrums?.map((el, indx) => {
                    const isNotFist = indx > 0
                    const isLast = indx == breadscrums.length - 1
                    return <>
                        {isNotFist && <span>/</span>}
                        <Link
                            key={`${el.link} - ${el.text}`}
                            to={el.link}
                            className={
                                clsx(
                                    'text-xs hover:underline hover:underline-offset-2',
                                    isLast && 'underline underline-offset-2'
                                )}>
                            {el.text}
                        </Link>
                    </>
                }

                )
            }
        </div>
    )

})