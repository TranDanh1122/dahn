import React from "react";
import ArrayFormContextProvider, { type ArrayFormContextProps } from "../context/ArrrayForm.context";
import ArrayFormComponent from "../components/ArrayForm.component";
export default function ArrayForm<T>({
    name,
    label,
}: ArrayFormContextProps): React.JSX.Element {
    return (
        <ArrayFormContextProvider<T> name={name} label={label}>
            <ArrayFormComponent />
        </ArrayFormContextProvider>
    );
}