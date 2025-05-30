
export interface SelectProps<T> {
    dataSets: T[],
    valueKey?: keyof T,
    textKey?: keyof T,
    className?: string,
    onChange?: (value: T[keyof T] | T) => void
    changeValue?: "all" | "value" | "text",
    defaultValue: T,
    children?: React.ReactNode
}