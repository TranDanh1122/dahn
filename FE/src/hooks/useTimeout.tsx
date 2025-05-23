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
    const setDelay = (step: number, delay?: number) => {

        if (delay) setWait(delay)

        setTimeout(() => {
            setWait(prev => {
                if (prev == 0) return prev
                setDelay(step)
                return prev - step
            })

        }, 1000 * step)

    }


    return { wait, setDelay }

}