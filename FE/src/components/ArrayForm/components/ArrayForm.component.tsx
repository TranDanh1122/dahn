import Button from "@components/Button.component";
import React from "react";
import FormModal from "./FormModal.component";
import { ArrayFormContext } from "../context/ArrrayForm.context";
import X from "lucide-react/dist/esm/icons/x";

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
                            <div onClick={() => handleOpen?.(index)} key={el.id}
                                className="py-4 border-b border-neutral-200 grid grid-cols-5 items-center cursor-pointer hover:bg-neutral-100 hover:rounded-lg hover:px-2 hover:shadow">
                                {
                                    React.cloneElement(itemEl || <></>, {
                                        data: form?.getValues(`${name}.${index}`)
                                    })
                                }
                                <X onClick={
                                    (e: React.MouseEvent) => {
                                        e.stopPropagation()
                                        remove?.(index);
                                    }
                                }
                                    className="text-neutral-600 font-light hover:text-red-500 cursor-pointer mx-auto"
                                />
                            </div>

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