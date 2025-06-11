import React from "react";
import
ArrayFormContextProvider,
{ type ArrayFormContextProps }
    from "../context/ArrrayForm.context";
import ArrayFormComponent from "../components/ArrayForm.component";
/**
 * @param {string} name - Name of array fields
 * @param {string} label - Description of what this field is
 * @param {React.ReactElement} [headerEl] - Header of table you need when displaying added items
 * @param {React.ReactElement} [itemEl] - React element for each item
 * @param {React.ReactNode} [children] - React children nodes
 * @param {React.ReactElement} [modalFormContent] - React element for modal form content
 * @param {import('zod').ZodObject<import('react-hook-form').FieldValues>} [modalFormSchema] - ZodObject<FieldValues> for form schema
 * @returns {JSX.Element}
 */

export default function ArrayForm({ ...props }: ArrayFormContextProps): React.JSX.Element {
    return (
        <ArrayFormContextProvider {...props}>
            <ArrayFormComponent />
        </ArrayFormContextProvider>
    );
}