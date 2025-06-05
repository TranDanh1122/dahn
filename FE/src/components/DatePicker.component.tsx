import React from "react";
import { default as DatePickerClass } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
/**
 * Date Picker is class component, so you need to create instance and render it to React Node or React Element
 */

export default React.memo(function DatePicker(): React.JSX.Element {
    const [date, setDate] = React.useState(new Date());

    const dateInp = new DatePickerClass({
        selected: date,
        onChange: (date: Date | null) => setDate(date || new Date()),
        showTimeSelect: true,
        dateFormat: "Pp",
    }).renderInputContainer();
    return dateInp;
});
