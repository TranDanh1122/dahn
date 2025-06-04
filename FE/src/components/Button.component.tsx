import React from "react";

export default React.memo(function Button({
    className,
    children,
    ...props
}: React.ComponentProps<"button">): React.JSX.Element {
    return (
        <button
            className={`
                font-semibold rounded-lg 
                px-4 py-2 cursor-pointer 
                disabled:cursor-not-allowed 
                ${className}
            `}
            {...props}>
            {children}
        </button>
    );
});
