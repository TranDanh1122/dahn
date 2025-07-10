import React from "react";
import { useFieldArray, useFormContext, type FieldValues } from "react-hook-form";

const useArrayForm = (name: string) => {
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

    const upsert = React.useCallback((data: FieldValues,) => {
        if (state >= 0) {
            update(state, data);
        } else {
            append(data);
        }
        setState(-2)
    }, [state])



    return {
        fields,
        remove,
        form,
        setState,
        upsert,
        state
    }
}
export default useArrayForm