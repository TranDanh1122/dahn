import { MilestoneStatus } from "@/modules/project/const";
import { zodResolver } from "@hookform/resolvers/zod";
import { milestoneSchema } from "@project/models/request.schema";
import React from "react";
import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
export interface MileStoneModalProps {
    handleClose: () => void,
    onSubmit: (data: z.infer<typeof milestoneSchema>, index?: number) => void,
    index?: number
}
export const useMilestoneModal = ({ ...props }: Omit<MileStoneModalProps, "handleClose">) => {
    const form = useFormContext();
    const defaultValues = React.useMemo(() => {
        return typeof props.index == "number"
            ? form.getValues(`milestones.${props.index}`)
            : { status: MilestoneStatus[0].value }
    }, [props.index, form])
    const mileStoneForm = useForm<z.infer<typeof milestoneSchema>>({
        resolver: zodResolver(milestoneSchema),
        defaultValues
    });

    const handleSubmit = (values: z.infer<typeof milestoneSchema>) => {
        props.onSubmit(values, props.index);
    };

    const iniDate = {
        from: mileStoneForm.getValues("startDate") ? new Date(mileStoneForm.getValues("startDate")) : undefined,
        to: mileStoneForm.getValues("endDate") ? new Date(mileStoneForm.getValues("endDate")) : undefined
    }
    const status = mileStoneForm.getValues("status")

    const defaultStatusValue =
        status
            ? {
                value: status,
                text: MilestoneStatus.find(el => el.value == status)?.text || ""
            }
            : MilestoneStatus[0]
    const handlePickerDate = (start: string, end: string, duration: string) => {
        if (start && end && duration) {
            mileStoneForm.setValue("startDate", start)
            mileStoneForm.setValue("endDate", end)
            mileStoneForm.setValue("duration", Number(duration))
        }
    }
    return {
        mileStoneForm,
        handleSubmit,
        form,
        defaultStatusValue,
        iniDate,
        handlePickerDate
    };
}