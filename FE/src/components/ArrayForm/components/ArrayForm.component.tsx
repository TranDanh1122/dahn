import Button from "@components/Button.component";
import React from "react";
import FormModal from "./FormModal.component";
import { ArrayFormContext } from "../context/ArrrayForm.context";

/**
 * ArrayForm form array field in react hook form
 * you must use it INSIDE REACT HOOK FORM
 * @param param0 
 * @returns 
 */
export default function ArrayForm(): React.JSX.Element {

    const {
        modalState,
        handleOpen,
        label,
        name,
        fields,
        remove,
        headerEl,
        itemEl,
        form
    } = React.useContext(ArrayFormContext)
    return (
        <>
            <fieldset className="space-y-2" >
                <div className="flex items-center gap-2 te">
                    <legend className="text-neutral-600">{label}</legend>
                    <Button
                        onClick={() => handleOpen?.()}
                        className="
                                    font-light! text-neutral-600
                                    border border-neutral-400 
                                    rounded-full! 
                                    p-0! size-6
                                    flex items-center justify-center"
                        type="button">
                        +
                    </Button>
                </div>

                {
                    fields && headerEl && <>{headerEl}</>
                }
                {
                    fields &&
                    fields.map(
                        (el, index) => (
                            React.cloneElement(itemEl || <></>, {
                                key: el.id,
                                removeItem: () => remove?.(index),
                                handleOpen: () => handleOpen?.(index),
                                data: form?.getValues(`${name}.${index}`)
                            })
                        )
                    )}
            </fieldset >
            {
                modalState?.open &&
                <FormModal />
            }
        </>
    )
}