import React from "react";
import MileStoneModal from "./modal/MileStone.modal";
import Button from "@components/Button.component"
import { MilestoneStatus, MilestoneStatusColor } from "@project/const"
import { useStep3 } from "./hooks/useStep3.hook";
export default function Step3(): React.JSX.Element {
    const {
        form,
        handleClose,
        handleOpen,
        milestones,
        modalState,
        upsertMilestone
    } = useStep3()
    return (
        <>
            <fieldset >
                <div className="flex items-center gap-2 te">
                    <legend className="text-neutral-600">Milestones</legend>
                    <Button
                        onClick={() => handleOpen()}
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
                                    {
                                        MilestoneStatus.find(el =>
                                            el.value == form.getValues(`milestones.${index}.status`)
                                        )?.text
                                    }
                                </p>
                            </div>
                        })
                }
            </fieldset>
            {
                modalState.open &&
                <MileStoneModal
                    onSubmit={upsertMilestone}
                    handleClose={handleClose}
                    index={modalState.index}
                />
            }
        </>
    );
}
