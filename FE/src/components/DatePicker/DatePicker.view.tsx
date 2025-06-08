import React from "react";
import "react-day-picker/style.css";
import { Dropdown } from "@components/Dropdown";
import Input from "../Input.component";
import DatePickerComponent from "./DatePicker.component";
import { useDatePicker } from "./useDatePicker.hook";
interface DatePickerProps extends React.ComponentProps<"input"> {
    className?: string
    startDate?: React.ComponentProps<"input">
    endDate?: React.ComponentProps<"input">,
    duration?: React.ComponentProps<"input">
}
export default React.memo(function DatePicker({ className, startDate, endDate, duration, ...props }: DatePickerProps): React.JSX.Element {
    const { setSelected, selected, duration: durationVal, selectedDate } = useDatePicker()
    return (
        <Dropdown
            className={className}
            dropContent={
                <DatePickerComponent
                    selected={selected}
                    setSelected={setSelected}
                />
            }>
            <Input
                {...props}
                readOnly
                placeholder="Start Date - End Date"
                label="Duration"
                labelClass="font-light!"
                value={selectedDate}>
                <span
                    className="
                        absolute 
                        top-1/2 
                        -translate-y-1/2 
                        right-2">
                    {durationVal}
                </span>
            </Input>
            <Input
                hidden
                {...duration}
                value={durationVal || 0}
            />
            <Input
                hidden
                {...startDate}
                value={
                    selected?.from?.toDateString()
                    ||
                    (new Date()).toDateString()
                }
            />
            <Input
                hidden
                {...endDate}
                value={
                    selected?.to?.toDateString()
                    ||
                    (new Date()).toDateString()
                }
            />
        </Dropdown>
    );
});
