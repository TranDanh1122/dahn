import React from "react";
import "react-day-picker/style.css";
import { Dropdown } from "@components/Dropdown";
import Input from "../Input.component";
import DatePickerComponent from "./DatePicker.component";
import { useDatePicker } from "./useDatePicker.hook";
interface DatePickerProps extends React.ComponentProps<"input"> {
    className?: string
}
export default React.memo(function DatePicker({ className, ...props }: DatePickerProps): React.JSX.Element {
    const { setSelected, selected, duration, selectedDate } = useDatePicker()
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
                    {duration}
                </span>
            </Input>

        </Dropdown>
    );
});
