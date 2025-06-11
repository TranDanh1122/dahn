import { useFieldArray, useFormContext } from "react-hook-form";
import { z } from "zod";
import { milestoneSchema } from "@project/models/request.schema";
import { useModal } from "@/common/hooks/useModal";

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

    const { modalState, close, open } = useModal<{ index?: number, open: boolean }>()
    const form = useFormContext();

    const {
        fields: milestones,
        append,
        update,
        remove,
    } = useFieldArray({
        control: form.control,
        name: "milestones",
    });

    const handleClose = () => close({ open: false });

    const handleOpen = (index?: number) => open({ open: true, index });

    const upsertMilestone = (
        data: z.infer<typeof milestoneSchema>,
        index?: number
    ) => {
        close({ open: false });
        if (typeof index == "number") return update(index, data);
        return append(data);
    };
    return {
        form,
        modalState,
        handleClose,
        handleOpen,
        upsertMilestone,
        milestones,
        remove,
    };
};
