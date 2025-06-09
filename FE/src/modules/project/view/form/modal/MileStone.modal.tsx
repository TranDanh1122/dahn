import TextArea from "@components/TextArea.component";
import Input from "@components/Input.component";
import X from "lucide-react/dist/esm/icons/x";
import React from "react";
import { DatePicker } from "@components/DatePicker";
import { FormProvider } from "react-hook-form";
import Button from "@components/Button.component";
import { Select } from "@components/Select";
import { MilestoneStatus, type EnumSelectType } from "@project/const";
import { useMilestoneModal, type MileStoneModalProps } from "../hooks/useMilestoneModal.hook";

export default React.memo(
    function MileStoneModal({ handleClose, index, onSubmit }: MileStoneModalProps) {
        const { mileStoneForm, handleSubmit, form } = useMilestoneModal({ index, onSubmit })
        return <>
            <div className="fixed top-0 left-0 bg-black/20 z-1 w-screen h-screen"></div>
            <FormProvider {...mileStoneForm}>
                <div className="space-y-4 rounded-2xl fixed top-1/2 left-1/2 w-1/3 -translate-1/2 bg-white z-10 p-12">
                    <X onClick={handleClose}
                        className="absolute top-4 right-4 cursor-pointer text-neutral-600"
                    />
                    <div className="flex items-end gap-4">
                        <Input
                            {...mileStoneForm.register(`name`)}
                            labelClass="font-light!"
                            placeholder="eg: Milestone 1 - Setup Database"
                            label="Milestone Name"
                            fieldsetClass="w-full"
                            error={mileStoneForm.formState.errors.name?.message}
                        />
                        <DatePicker
                            className="w-full"
                            startDate={{ ...mileStoneForm.register(`startDate`) }}
                            endDate={{ ...mileStoneForm.register(`endDate`) }}
                            duration={{ ...mileStoneForm.register(`duration`) }}
                            error={
                                mileStoneForm.formState.errors.startDate?.message ||
                                mileStoneForm.formState.errors.endDate?.message ||
                                mileStoneForm.formState.errors.duration?.message
                            }
                        />
                    </div>
                    <div className="flex items-end gap-4" >
                        <Input
                            {...mileStoneForm.register("process")}
                            labelClass="font-light!"
                            placeholder="eg: 15%"
                            label="Process"
                            fieldsetClass="w-full"
                            error={mileStoneForm.formState.errors.process?.message}
                        />
                        <Select<EnumSelectType[number]>
                            dataSets={MilestoneStatus}
                            defaultValue={MilestoneStatus[0]}
                            changeValue="value"
                            textKey="text"
                            valueKey="value"
                            className="w-full border border-neutral-300 hover:border-fuchsia-300 rounded-lg"
                            onChange={(value) => mileStoneForm.setValue("status", String(value))}
                        />
                    </div>
                    <TextArea
                        {...form.register(`milestones.${index}.description`)}
                        placeholder="eg: Setup Database"
                        labelClass="font-light!"
                        label="Description"
                        rows={3}
                        error={mileStoneForm.formState.errors.description?.message}
                    />
                    <div className="flex items-center justify-between">
                        <Button onClick={handleClose}
                            className="bg-transparent border border-neutral-400 text-neutral-600 font-light!">
                            Cancel
                        </Button>
                        <Button onClick={mileStoneForm.handleSubmit(handleSubmit)}
                            className="bg-blue-500 text-white font-light!">
                            Add
                        </Button>
                    </div>
                </div>
            </FormProvider >
        </>
    });
