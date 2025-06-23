import React from "react";
interface BadgeProps extends React.ComponentProps<"span"> {
    color: string;
    bgColor: string;
}
export default React.memo(function Badge({ color, bgColor, children }: BadgeProps): React.JSX.Element {
    return (
        <span
            className={`text-xs ${color} ${bgColor} 
                        rounded-full px-2 py-0.5
                        border border-${color}`}>
            {children}
        </span>
    );
});
