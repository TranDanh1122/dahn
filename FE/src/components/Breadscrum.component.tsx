import { BreadscrumContext } from "@/context/Breadscrum.context";
import React from "react";
import { Link } from "react-router-dom";

export default React.memo(function Breadscrum(): React.JSX.Element {
    const { breadscrums } = React.useContext(BreadscrumContext)
    return (
        <div className="space-x-1">
            {
                breadscrums?.map((el, indx) =>
                    <>
                        {indx > 0 && <span>/</span>}
                        <Link
                            key={`${el.link} - ${el.text}`}
                            className={`text-xs hover:underline hover:underline-offset-2 ${indx == breadscrums.length - 1 ? "underline underline-offset-2" : ""}`}
                            to={el.link}>
                            {el.text}
                        </Link>
                    </>
                )
            }
        </div>
    )

})