import React from "react";
import { DayPicker, NextMonthButton, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { Dropdown } from "@components/Dropdown";
import Input from "./Input.component";
import { ChevronLeft, ChevronRight } from "lucide-react";
/**
 * Date Picker is class component, so you need to create instance and render it to React Node or React Element
 */
interface DatePickerProps extends React.ComponentProps<"input"> {
    className?: string
}
export default React.memo(function DatePicker({ className, ...props }: DatePickerProps): React.JSX.Element {
    const [selected, setSelected] = React.useState<DateRange>();
    const selectedDate = React.useMemo(() => {
        if (!selected) return ""
        const startDate = selected.from?.toLocaleDateString()
        const endDate = selected.to?.toLocaleDateString()
        return `${startDate || "Start Date"} - ${endDate || "End Date"}`
    }, [selected]);
    return (
        <Dropdown
            className={className}
            dropContent={
                <DayPicker
                    components={
                        {
                            NextMonthButton: (props) =>
                                <ChevronRight
                                    {...props}
                                    className="size-5.5"
                                    onClick={
                                        (e: React.MouseEvent) => {
                                            e.stopPropagation();
                                            props.onClick()
                                        }
                                    } />,
                            PreviousMonthButton: (props) => <ChevronLeft
                                {...props}
                                className="size-5.5"
                                onClick={
                                    (e: React.MouseEvent) => {
                                        e.stopPropagation();
                                        props.onClick()
                                    }
                                } />,
                        }
                    }
                    className="flex justify-center"
                    mode="range"
                    selected={selected}
                    onSelect={setSelected}
                />
            }>
            <Input
                {...props}
                readOnly
                placeholder="Start Date - End Date"
                label="Duration"
                labelClass="font-light!"
                value={selectedDate}
            >
                <span className="absolute top-1/2 -translate-y-1/2 right-2">
                    {selected?.from && selected?.to
                        ? Math.ceil(
                            (selected.to.getTime() - selected.from.getTime()) / (1000 * 60 * 60 * 24)
                        )
                        : ""} days
                </span>
            </Input>

        </Dropdown>
    );
});
