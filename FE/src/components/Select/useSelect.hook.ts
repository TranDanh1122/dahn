import React from "react";
import type { SelectProps } from "./type";
import { useOutsideClick } from "@/common/hooks/useOutsideClick";
import { isObjectEqual } from "@/common/ults/Tool";
type Props<T> = Omit<SelectProps<T>, "className" | "children" | "dataSets">
export default function useSelect<T>({ defaultValue, onChange, changeValue, valueKey, textKey }: Props<T>) {
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

    return { open, dropboxRef, handleChange, value, setOpen }

}