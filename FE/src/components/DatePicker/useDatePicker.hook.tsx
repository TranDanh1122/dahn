import React from "react"
import type { DateRange } from "react-day-picker"
import { MILI_SECOND_PER_DAY } from "@/common/ults/Common.const";

export const useDatePicker = (onDateChange?: (startDate: string, endDate: string, duration: string) => void, initData?: DateRange) => {
    const [selected, setSelected] = React.useState<DateRange | undefined>(initData);
    const selectedDate = React.useMemo(() => {
        if (!selected) return ""
        const startDate = selected.from?.toLocaleDateString()
        const endDate = selected.to?.toLocaleDateString()
        return `${startDate || "Start Date"} - ${endDate || "End Date"}`
    }, [selected]);
    const duration = React.useMemo(() => {
        const end = selected?.to?.getTime()
        const start = selected?.from?.getTime()
        if (!end || !start) return 0
        return Math.ceil((end - start) / MILI_SECOND_PER_DAY)
    }, [selected])

    React.useEffect(() => {
        const start = selected?.from?.toDateString() || (new Date()).toDateString()
        const end = selected?.to?.toDateString() || (new Date()).toDateString()
        onDateChange?.(start, end, String(duration))
    }, [selected, duration])
    return { setSelected, selectedDate, selected, duration }
}