import type { ModalProps } from "@components/ArrayForm";
import { MilestoneStatus } from "@project/const";

export const useMilestoneModal = ({ modalForm }: ModalProps) => {
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