import { getDisplayText } from "@/common/ults/Tool";
import React from "react";
import type { SelectProps } from "./type";
import useSelect from "./useSelect.hook";
import { v4 } from "uuid";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down"

/**
 * Custom Select component
 *
 * @param className --> className of the select component
 * @param dataSets --> dataSets of the select component
 * @param valueKey --> key of the value in the dataSets
 * @param textKey --> key of the text in the dataSets
 * @param onChange --> onChange function of the select component
 * @param changeValue --> what you need to get form dataset of the select component
 *
 * @returns
 *
 */
export default function Select<T>({
    children,
    className,
    dataSets,
    valueKey,
    textKey,
    onChange,
    changeValue,
    defaultValue,
    multiple,
    hasIcon
}: SelectProps<T>): React.JSX.Element {
    const { open, dropboxRef, handleChange, setOpen, value } = useSelect<T>({
        defaultValue,
        onChange,
        changeValue,
        valueKey,
        textKey,
        multiple
    });

    return (
        <div
            className={`relative text-sm ${className}`}
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox">
            <div
                className="p-2 pr-6 w-full cursor-pointer bg-white rounded-md font-light hover:bg-slate-200 group"
                onClick={() => setOpen(!open)}>
                {!children && getDisplayText(value, textKey)}
                {children && children}
                {
                    hasIcon &&
                    <ChevronDown
                        className={`
                        ${open && "rotate-180"}
                        text-slate-600
                        size-4 bg-white 
                        group-hover:bg-slate-200
                        absolute top-1/2 right-2 
                        -translate-y-1/2
                            `}
                    />
                }
            </div>
            {open && dataSets.length > 0 && (
                <div
                    ref={dropboxRef}
                    role="listbox"
                    className="absolute z-10 h-max max-h-screen w-max p-1 top-full left-0 bg-white rounded-md shadow-md shadow-slate-500">
                    {dataSets.map((dataSet: T) => {
                        const content = getDisplayText(dataSet, textKey);
                        return (
                            <p
                                role="option"
                                key={v4()}
                                onClick={() => handleChange(dataSet)}
                                className={` px-2 py-1 cursor-pointer font-light rounded-md w-full hover:bg-slate-200`}
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
