import React from "react"
export function useOutsideClick<T extends HTMLElement>(callback: () => void) {
    const ref = React.useRef<T | null>(null)
    const handleOutsideClick = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as HTMLElement))
            callback()
    }
    React.useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);
    return ref
}