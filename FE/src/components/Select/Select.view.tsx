import { getDisplayText } from "@/common/ults/Tool";
import React from "react";
import type { SelectProps } from "./type";
import useSelect from "./useSelect.hook";

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
export default function Select<T>({ children, className, dataSets, valueKey, textKey, onChange, changeValue, defaultValue }: SelectProps<T>): React.JSX.Element {
    const { open, dropboxRef, handleChange, setOpen, value } = useSelect<T>({ defaultValue, onChange, changeValue, valueKey, textKey })

    return <div className={`relative ${className}`} role="combobox" aria-expanded={open} aria-haspopup="listbox">
        <div className="p-2 w-full cursor-pointer bg-white rounded-md font-light hover:bg-neutral-200" onClick={() => setOpen(!open)}>
            {!children && getDisplayText(value, textKey)}
            {children && children}
        </div>
        {open && dataSets.length > 0 && <div ref={dropboxRef} role="listbox" className="absolute h-max max-h-screen w-max p-1 top-full left-0 bg-white rounded-md shadow-md shadow-neutral-500 flex flex-col justify-stretch">
            {
                dataSets.map((dataSet: T) => {
                    const content = getDisplayText(dataSet, textKey)
                    return (
                        <p role="option" key={dataSet as unknown as string}
                            onClick={() => handleChange(dataSet)}
                            className={` px-2 py-1 cursor-pointer font-light rounded-md w-full hover:bg-neutral-200`}
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    );
                })
            }

        </div>
        }
    </div>
}