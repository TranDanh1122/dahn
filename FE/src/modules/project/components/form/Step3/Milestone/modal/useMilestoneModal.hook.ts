import type { milestoneSchema } from "@project/models/request.schema";
import type { ModalProps } from "@components/ArrayForm";
import { MilestoneStatus } from "@project/const";
import React from "react";
import { z } from "zod";

export const useMilestoneModal = ({ modalForm }: ModalProps<z.infer<typeof milestoneSchema>>) => {
    React.useEffect(() => {
        if (!modalForm?.getValues("status")) modalForm?.setValue("status", "not_started")
    }, [modalForm?.watch("status")])
    React.useEffect(() => {
        if (!modalForm?.getValues("startDate")) modalForm?.setValue("startDate", new Date().toDateString())
    }, [modalForm?.watch("startDate")])
    React.useEffect(() => {
        if (!modalForm?.getValues("endDate")) modalForm?.setValue("endDate", new Date().toDateString())
    }, [modalForm?.watch("endDate")])
    if (!modalForm) return
    const iniDate = {
        from: modalForm.getValues("startDate") ? new Date(modalForm.getValues("startDate")) : undefined,
        to: modalForm.getValues("endDate") ? new Date(modalForm.getValues("endDate")) : undefined
    }
    const status = modalForm.getValues("status")

    const defaultStatusValue =
        status
            ? {
                value: status,
                text: MilestoneStatus.find(el => el.value == status)?.text || ""
            }
            : MilestoneStatus[0]
    const handlePickerDate = (start: string, end: string, duration: string) => {
        if (start && end && duration) {
            modalForm.setValue("startDate", start)
            modalForm.setValue("endDate", end)
            modalForm.setValue("duration", Number(duration))
        }
    }
    return {
        defaultStatusValue,
        iniDate,
        handlePickerDate
    };
}