import React from "react";
import { useFieldArray, useFormContext, type FieldValues } from "react-hook-form";

const useArrayForm = (name: string, customSubmit?: (data: FieldValues, index?: number) => void) => {
    const form = useFormContext()
    const { fields, remove, update, append } = useFieldArray({
        name: name,
        control: form.control
    })
    //this state manager UI status of Array form and modal subform
    //-2 modal off
    //-1 modal with blank data
    // >-1 modal with data (index is state)
    const [state, setState] = React.useState<number>(-2)

    const upsert = React.useCallback((data: FieldValues) => {
        if (state >= 0) {
            update(state, data);
        } else {
            append(data);
        }
        setState(-2)
    }, [state])


    const submit = React.useCallback((data: FieldValues) => {
        if (customSubmit) {
            customSubmit(data, state)
        } else {
            upsert(data)
        }
        setState(prev => prev != -2 ? -2 : prev)
    }, [state])

    return {
        fields,
        remove,
        form,
        setState,
        upsert,
        state,
        submit
    }
}
export default useArrayForm