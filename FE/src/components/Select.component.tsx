import { useOutsideClick } from "@/common/hooks/useOutsideClick";
import { isObjectEqual, getDisplayText } from "@/common/ults/Tool";
import React from "react";

interface SelectProps<T> {
    dataSets: T[],
    valueKey?: keyof T,
    textKey?: keyof T,
    className?: string,
    onChange?: (value: T[keyof T] | T) => void
    changeValue?: "all" | "value" | "text",
    defaultValue: T
}
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
export default function Select<T>({ className, dataSets, valueKey, textKey, onChange, changeValue, defaultValue }: SelectProps<T>): React.JSX.Element {
    const [value, setValue] = React.useState<T>(defaultValue)
    const [open, setOpen] = React.useState<boolean>(false)
    const dropboxRef = useOutsideClick<HTMLDivElement>(() => setOpen(false))
    const handleChange = React.useCallback((dataSet: T) => {
        if (value === dataSet || isObjectEqual(dataSet, value)) return
        setOpen(false)
        switch (changeValue) {
            case "value":
                if (!valueKey) throw new Error("Missing valueKey props")
                onChange?.(dataSet[valueKey])
                break;
            case "text":
                if (!textKey) throw new Error("Missing textKey props")
                onChange?.(dataSet[textKey])
                break;
            default:
                onChange?.(dataSet)
                break;
        }
        setValue(dataSet)
    }, [value])

    return <div className={`relative ${className}`} role="combobox" aria-expanded={open} aria-haspopup="listbox">
        <div className="p-2 w-full cursor-pointer bg-white rounded-md font-light hover:bg-neutral-200" onClick={() => setOpen(!open)}>
            {getDisplayText(value, textKey)}
        </div>
        {open && <div ref={dropboxRef} role="listbox" className="absolute h-max max-h-screen w-max p-1 top-full left-0 bg-white rounded-md shadow-md shadow-neutral-500 flex flex-col justify-stretch">
            {
                dataSets.length > 0 && dataSets.map((dataSet: T) => {
                    const content = getDisplayText(dataSet, textKey)
                    return (
                        <p role="option"
                            onClick={() => handleChange(dataSet)}
                            className={` px-2 py-1 cursor-pointer font-light rounded-md w-full hover:bg-neutral-200`}
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    );
                })
            }
            {

                dataSets.length == 0 && <p role="option" className="w-full text-center">No data</p>
            }
        </div>
        }
    </div>
}