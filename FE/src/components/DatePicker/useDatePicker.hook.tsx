import React from "react"
import type { DateRange } from "react-day-picker"
import { MILI_SECOND_PER_DAY } from "@/common/ults/Common.const";
export const useDatePicker = () => {
    const [selected, setSelected] = React.useState<DateRange>();
    const selectedDate = React.useMemo(() => {
        if (!selected) return ""
        const startDate = selected.from?.toLocaleDateString()
        const endDate = selected.to?.toLocaleDateString()
        return `${startDate || "Start Date"} - ${endDate || "End Date"}`
    }, [selected]);
    const duration = React.useMemo(() => {
        const end = selected?.to?.getTime()
        const start = selected?.from?.getTime()
        if (!end || !start) return ""
        return ` ${Math.ceil((end - start) / MILI_SECOND_PER_DAY)} days`

    }, [selected])
    return { setSelected, selectedDate, duration, selected }
}