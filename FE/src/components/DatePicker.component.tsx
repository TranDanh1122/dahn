import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
/**
 * Date Picker is class component, so you need to create instance and render it to React Node or React Element
 */

export default React.memo(function DatePicker(): React.JSX.Element {
    const [selected, setSelected] = React.useState<Date>();

    return (
        <DayPicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
            footer={
                selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
            }
        />
    );
});
