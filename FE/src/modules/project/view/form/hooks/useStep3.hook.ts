import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { z } from "zod"
import { milestoneSchema } from "@project/models/request.schema";

/**
 * A simple hook, handle open/close sub-form modal (milestone form) and save data form it to field in field Array
 * @returns form: form in current context
 * @return modalState<{open: boolean , index?: number}>: modal state
 * @return handleClose: close modal action
 * @return handleOpen: open modal action
 * @return upsertMilestone : modal submit action
 * @return milestones : list of milestonrs
 */
export const useStep3 = () => {

    const [modalState, setModalState] = React.useState<{ open: boolean, index?: number }>({ open: false });

    const form = useFormContext();

    const { fields: milestones, append, update } = useFieldArray({
        control: form.control,
        name: "milestones",
    });

    const handleClose = () => setModalState({ open: false })

    const handleOpen = (index?: number) => setModalState({ open: true, index })

    const upsertMilestone = (data: z.infer<typeof milestoneSchema>, index?: number) => {
        setModalState({ open: false })

        if (index) return update(index, data)

        return append(data)
    }
    return {
        form,
        modalState,
        handleClose,
        handleOpen,
        upsertMilestone,
        milestones
    }
}