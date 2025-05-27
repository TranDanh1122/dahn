import React from "react";
export default function useDebounce() {
    const debounceRef = React.useRef<NodeJS.Timeout | null>(null)
    const debouce = (callback: () => void, bouncingTime: number = 300) => {
        const current = debounceRef.current
        if (current) clearTimeout(current)
        debounceRef.current = setTimeout(() => {
            callback()
        }, bouncingTime)
    }
    React.useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current)
        }
    }, [])
    return { debouce }
}