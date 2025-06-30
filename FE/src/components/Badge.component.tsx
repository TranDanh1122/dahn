import React from "react";
import clsx from "clsx/lite";
interface BadgeProps extends React.ComponentProps<"span"> {
    color: string;
    bgColor: string;
}
export default React.memo(function Badge({ color, bgColor, children, ...props }: BadgeProps): React.JSX.Element {
    return (
        <span {...props}
            className={
                clsx(`text-xs rounded-full px-2 py-0.5 border`,
                    `${color} border-${color}`,
                    bgColor
                )}>
            {children}
        </span>
    );
});
