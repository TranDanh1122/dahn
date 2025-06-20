import React from "react";
import type { ItemData, RadioGroupProps } from ".";
interface RadioItemProps extends Omit<RadioGroupProps, "dataSets" | "label"> {
    checked: boolean;
    data: ItemData;
}
export default function RadioItem({
    onChange,
    checked,
    data,
    itemEl
}: RadioItemProps): React.JSX.Element {
    return (
        <div
            onClick={() => onChange(data.value)}
            role="radio"
            aria-checked={checked}
            tabIndex={0}
            className="w-full gap-2 border 
                border-slate-300 p-2 
                rounded-md hover:border-blue-300 hover:bg-blue-50/30 ">
            <label htmlFor={`radio-${data.value}`}
                className="font-light text-sm flex items-center gap-2">
                <div id={`radio-${data.value}`}
                    className={`radio relative rounded-full size-5 border border-slate-400 ${checked ? "active" : ""} `}
                ></div>
                {React.cloneElement(itemEl || <></>, { data })}
                {!itemEl && <h2>{data.text}</h2>}
            </label>
        </div>
    );
}
