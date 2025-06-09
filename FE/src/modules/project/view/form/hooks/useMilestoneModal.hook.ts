import { MilestoneStatus } from "@/modules/project/const";
import { zodResolver } from "@hookform/resolvers/zod";
import { milestoneSchema } from "@project/models/request.schema";
import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
export interface MileStoneModalProps {
    handleClose: () => void,
    onSubmit: (data: z.infer<typeof milestoneSchema>, index?: number) => void,
    index?: number
}
export const useMilestoneModal = ({ ...props }: Omit<MileStoneModalProps, "handleClose">) => {
    const form = useFormContext()
    const mileStoneForm = useForm<z.infer<typeof milestoneSchema>>({
        resolver: zodResolver(milestoneSchema),
        defaultValues: props.index ? form.getValues("milestones")[props.index] : { status: MilestoneStatus[0].value }
    })
    const handleSubmit = (values: z.infer<typeof milestoneSchema>) => {
        props.onSubmit(values, props.index)
    }
    return { mileStoneForm, handleSubmit, form }
}