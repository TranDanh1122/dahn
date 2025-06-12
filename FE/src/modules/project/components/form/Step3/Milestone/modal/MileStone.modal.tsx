import TextArea from "@components/TextArea.component";
import Input from "@components/Input.component";
import React from "react";
import { DatePicker } from "@components/DatePicker";
import { Select } from "@components/Select";
import { MilestoneStatus, type EnumSelectType } from "@project/const";
import { useMilestoneModal } from "./useMilestoneModal.hook";
import type { ModalProps } from "@components/ArrayForm";
import type { z } from "zod";
import { milestoneSchema } from "@project/models/request.schema";

export default React.memo(
    function MileStoneModal({ modalForm }: ModalProps<z.infer<typeof milestoneSchema>>) {

        const hookReturn = useMilestoneModal({ modalForm })

        if (!modalForm || !hookReturn) return <></>

        const { defaultStatusValue, iniDate, handlePickerDate } = hookReturn

        return <>
            <div className="flex items-end gap-4">
                <Input
                    {...modalForm.register(`name`)}
                    labelClass="font-light!"
                    placeholder="eg: Milestone 1 - Setup Database"
                    label="Milestone Name"
                    fieldsetClass="w-full"
                    error={modalForm.formState.errors.name?.message}
                />
                <DatePicker
                    onDateChange={handlePickerDate}
                    className="w-full"
                    initData={iniDate}
                    error={
                        modalForm.formState.errors.startDate?.message ||
                        modalForm.formState.errors.endDate?.message ||
                        modalForm.formState.errors.duration?.message
                    }
                />
            </div>
            <div className="flex items-end gap-4" >
                <Input
                    {...modalForm.register("process")}
                    labelClass="font-light!"
                    placeholder="eg: 15%"
                    label="Process"
                    fieldsetClass="w-full"
                    error={modalForm.formState.errors.process?.message}
                />
                <Select<EnumSelectType[number]>
                    dataSets={MilestoneStatus}
                    defaultValue={defaultStatusValue}
                    changeValue="value"
                    textKey="text"
                    valueKey="value"
                    className="w-full border border-neutral-300 hover:border-blue-300 rounded-lg"
                    onChange={(value) => modalForm.setValue("status", String(value))}
                />
            </div>
            <TextArea
                {...modalForm.register("description")}
                placeholder="eg: Setup Database"
                labelClass="font-light!"
                label="Description"
                rows={3}
                error={modalForm.formState.errors.description?.message}
            />

        </>
    });
