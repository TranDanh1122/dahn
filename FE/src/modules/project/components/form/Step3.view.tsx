import React from "react";
import MileStoneModal from "./components/modal/MileStone.modal";
import Button from "@components/Button.component"
import { useStep3 } from "./hooks/useStep3.hook";
import MilestoneItem from "./components/MilestoneItem.component";
export default function Step3(): React.JSX.Element {
    const {
        form,
        handleClose,
        handleOpen,
        milestones,
        modalState,
        upsertMilestone,
        remove
    } = useStep3()
    return (
        <>
            <fieldset className="space-y-2" >
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
                    milestones && <div className="grid grid-cols-5 border-b border-b-neutral-200 py-2">
                        <div className="text-left">Name</div>
                        <div className="text-center">Duration (days)</div>
                        <div className="text-center">Process (%)</div>
                        <div className="text-right">Status</div>
                        <div className="text-center">Action</div>
                    </div>
                }
                {
                    milestones &&
                    milestones.map(
                        (el, index) => (
                            <MilestoneItem
                                key={el.id}
                                removeItem={() => remove(index)}
                                handleOpen={() => handleOpen(index)}
                                milestone={form.getValues(`milestones.${index}`)}
                            />
                        )
                    )}
            </fieldset >
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
