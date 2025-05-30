import React from "react";

/**
 * this hook will help you create countdown
 * use setDelay where you need start countdown
 * @param step : number
 * @param delay : number | undefined
 * @returns {wait , setDelay}
 */
export default function useTimeout() {
    const [wait, setWait] = React.useState<number>(0)
    const timeout = React.useRef<NodeJS.Timeout>(null)
    const setDelay = (step: number, delay?: number) => {

        if (delay) setWait(delay)
        if (timeout.current) clearTimeout(timeout.current)
        timeout.current = setTimeout(() => {
            setWait(prev => {
                if (prev == 0) return prev
                setDelay(step)
                return prev - step
            })

        }, 1000 * step)

    }
    React.useEffect(() => {
        return () => clearTimeout(timeout.current ?? "")
    }, [])

    return { wait, setDelay }

}