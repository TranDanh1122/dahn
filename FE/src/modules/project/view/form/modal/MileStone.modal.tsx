import TextArea from "@components/TextArea.component";
import Input from "@components/Input.component";
import X from "lucide-react/dist/esm/icons/x";
import React from "react";
import { DatePicker } from "@components/DatePicker";
import { useFormContext, useForm } from "react-hook-form";
import Button from "@components/Button.component";
import { z } from "zod"
import { milestoneSchema } from "@project/models/request.schema"
import { zodResolver } from "@hookform/resolvers/zod"
interface MileStoneModalProps {
    handleClose: (index?: number) => void
    index: number
}
export default React.memo(
    function MileStoneModal(
        {
            handleClose, index
        }: MileStoneModalProps) {
        const form = useFormContext()
        const mileStoneForm = useForm<z.infer<typeof milestoneSchema>>({
            resolver: zodResolver(milestoneSchema),
            defaultValues: form.getValues("milestones")[index]
        })
        return (
            <>
                <div className="
                    fixed top-0 left-0 
                    bg-black/20 z-1 
                    w-screen h-screen">
                </div>
                <div className="
                    space-y-4
                    rounded-2xl
                    fixed top-1/2 left-1/2 
                    w-1/3 -translate-1/2 
                    bg-white z-10 p-12">
                    <X
                        className="absolute top-4 right-4 cursor-pointer text-neutral-600"
                        onClick={() => handleClose(index)}
                    />
                    <div className="flex items-end gap-4">
                        <Input
                            {...mileStoneForm.register(`name`)}
                            labelClass="font-light!"
                            placeholder="eg: Milestone 1 - Setup Database"
                            label="Milestone Name"
                            fieldsetClass="w-full"
                        />
                        <DatePicker
                            className="w-full"
                            startDate={{ ...mileStoneForm.register(`startDate`) }}
                            endDate={{ ...mileStoneForm.register(`endDate`) }}
                            duration={{ ...mileStoneForm.register(`duration`) }}
                        />
                    </div>

                    <TextArea
                        {...form.register(`milestones.${index}.description`)}
                        placeholder="eg: Setup Database"
                        labelClass="font-light!"
                        label="Description"
                        rows={3}
                    />
                    <div className="flex items-center justify-between">
                        <Button className="
                                bg-transparent 
                                border border-neutral-400 
                              text-neutral-600 font-light!"
                            onClick={() => handleClose(index)}>
                            Cancel
                        </Button>
                        <Button className="
                                bg-blue-500 
                                text-white font-light!"
                            onClick={() => handleClose()}>
                            Add
                        </Button>
                    </div>
                </div>
            </>
        );
    });
