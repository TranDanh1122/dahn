import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import MileStoneModal from "./modal/MileStone.modal";
import Button from "@components/Button.component"
import { MilestoneStatusColor } from "@project/const"
export default function Step3(): React.JSX.Element {
    const [open, setOpen] = React.useState<boolean>(false);
    const form = useFormContext();
    const { fields: milestones, append, remove } = useFieldArray({
        control: form.control,
        name: "milestones",
    });

    const handleClose = React.useCallback((index?: number) => {
        setOpen(false)
        if (index) remove(index)
    }, [])
    const handleOpen = React.useCallback(() => {
        setOpen(true)
        append(
            {
                name: "",
                description: "",
                startDate: "",
                endDate: "",
                duration: "",
                process: 0,
                status: "not_started"
            }
        )

    }, [])
    return (
        <>
            <fieldset >
                <div className="flex items-center gap-2 te">
                    <legend className="text-neutral-600">Milestones</legend>
                    <Button
                        onClick={handleOpen}
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
                    milestones &&
                    milestones.map(
                        (el, index) => {
                            const color: string = MilestoneStatusColor[form.getValues(`milestones.${index}.status`)]
                            return <div className="flex items-center justify-between" key={el.id}>
                                <p>{form.getValues(`milestones.${index}.name`)}</p>
                                <p>{form.getValues(`milestones.${index}.duration`)}</p>
                                <p>{form.getValues(`milestones.${index}.process`)}</p>
                                <p className={`text-${color}-400`}>
                                    <span className={`size-3 rounded-full bg-${color}-400`}></span>
                                    {form.getValues(`milestones.${index}.status`)}
                                </p>
                            </div>
                        })
                }
            </fieldset>
            {
                open &&
                <MileStoneModal
                    handleClose={handleClose}
                    index={Math.max(milestones.length - 1, 0)}
                />
            }
        </>
    );
}
