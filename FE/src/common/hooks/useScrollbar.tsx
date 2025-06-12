import React from "react";
export default function useScrollbar<T extends HTMLElement>(maxHeight: number) {
    const ref = React.useRef<T | null>(null)
    React.useEffect(() => {
        const resizeCallback = () => {
            if (ref.current) {
                const el = ref.current
                const elHeight = el.getBoundingClientRect().height || 0
                if (elHeight >= maxHeight) {
                    el.classList.add(`overflow-y-scroll scrollbar-thin`)
                    el.style.maxHeight = `${maxHeight}px`;
                } else {
                    el.classList.remove(`overflow-y-scroll scrollbar-thin`)
                    el.style.maxHeight = `unset`;
                }
            }
        }
        const observer = new ResizeObserver(resizeCallback)
        if (ref.current) observer.observe(ref.current)
    }, [])
    return ref
}