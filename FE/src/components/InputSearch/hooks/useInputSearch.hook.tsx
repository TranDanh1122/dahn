import { useOutsideClick } from "@/common/hooks/useOutsideClick"
import React from "react"
import type { InputSearchProps } from "../type"
export default function useInputSearch<T, K>({ resultItemClick }: Pick<InputSearchProps<T, K>, "resultItemClick">) {
    const [searching, setSearching] = React.useState<boolean>(false)
    const ref = useOutsideClick<HTMLDivElement>(() => setSearching(false))
    const itemClick = React.useCallback((data: T) => {
        resultItemClick?.(data)
        setSearching(false)
    }, [searching])
    return { ref, itemClick,setSearching , searching}
}