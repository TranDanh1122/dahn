import type React from "react"

export interface SelectProps<T> extends Omit<React.ComponentProps<"select">, "onChange" | "defaultValue"> {
    dataSets: T[],
    valueKey?: keyof T,
    textKey?: keyof T,
    className?: string,
    onChange?: (value: T[keyof T] | T) => void
    changeValue?: "all" | "value" | "text",
    defaultValue: T,
    children?: React.ReactNode,
    hasIcon?: boolean
}