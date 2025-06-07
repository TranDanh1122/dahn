import React from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DatePickerComponentProps {
    selected?: DateRange
    setSelected: (selected?: DateRange) => void
}
export default React.memo(function DatePickerComponent({ selected, setSelected }: DatePickerComponentProps): React.JSX.Element {

    return <DayPicker
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
        required={false}
    />
}

);
