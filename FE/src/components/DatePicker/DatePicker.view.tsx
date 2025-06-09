import React from "react";
import "react-day-picker/style.css";
import { Dropdown } from "@components/Dropdown";
import Input from "../Input.component";
import DatePickerComponent from "./DatePicker.component";
import { useDatePicker } from "./useDatePicker.hook";
import type { DateRange } from "react-day-picker";
interface DatePickerProps extends React.ComponentProps<"input"> {
    className?: string
    initData?: DateRange,
    error?: string,
    onDateChange?: (startDate: string, endDate: string, duration: string) => void
}
export default React.memo(
    function DatePicker(
        {
            className,
            error,
            initData,
            onDateChange,
            ...props
        }: DatePickerProps): React.JSX.Element {

        const {
            setSelected,
            selected,
            selectedDate,
            duration
        } = useDatePicker(onDateChange, initData)

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
                    error={error}
                    value={selectedDate}>
                    <span className="absolute top-1/2 -translate-y-1/2 right-2">
                        {duration} days
                    </span>
                </Input>
            </Dropdown>
        );
    });
