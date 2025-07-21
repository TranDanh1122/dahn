import React from "react";
import Input from "@/components/Input.component";
import { z } from "zod";
import { communitationSchema } from "@project/models/request.schema";
import { Select } from "@components/Select";
import { CommunitationMeeting, type EnumSelectType } from "@project/const";
import TextArea from "@components/TextArea.component";
import { useFormContext } from "react-hook-form";
export default function CommunicationModal(): React.JSX.Element {
    const modalForm = useFormContext<z.infer<typeof communitationSchema>>()

    React.useEffect(() => {
        if (!modalForm?.getValues("meeting")) modalForm?.setValue("meeting", "no")
    }, [modalForm.watch("meeting")])

    if (!modalForm) return <></>
    return <>
        <div className="flex items-end gap-4">
            <Input
                fieldsetClass="w-full"
                label="Chanel Name"
                labelClass="font-light!"
                placeholder="eg: Discord Daily Meeting"
                {...modalForm.register("channel")}
                error={modalForm.formState.errors.channel?.message}
            />
            <Input
                fieldsetClass="w-full"
                label="Link"
                labelClass="font-light!"
                placeholder="eg: https://discord.com/group/g-meeting.com"
                {...modalForm.register("link")}
                error={modalForm.formState.errors.link?.message}
            />

        </div>
        <div className="flex items-end gap-4">
            <fieldset className="w-full flex flex-col gap-2">
                <label className="font-light text-sm text-slate-600 cursor-pointer" >
                    Status
                </label>
                <Select<EnumSelectType[number]>
                    dataSets={CommunitationMeeting}
                    defaultValue={CommunitationMeeting[0]}
                    changeValue="value"
                    textKey="text"
                    valueKey="value"
                    className="w-full border border-slate-300 hover:border-blue-300 rounded-lg"
                    onChange={(value) => {
                        if (typeof value == "string")
                            modalForm.setValue("meeting", String(value))
                    }}
                />
            </fieldset>
            {
                modalForm.watch("meeting") !== "no" &&
                <>
                    {
                        modalForm.watch("meeting") == "custom" &&
                        <Input
                            fieldsetClass="w-full"
                            label="Meeting"
                            labelClass="font-light!"
                            placeholder="eg: Every night"
                            {...modalForm.register("meetingCustom")}
                            error={modalForm.formState.errors.meetingCustom?.message}
                        />
                    }
                    < Input
                        fieldsetClass="w-full"
                        label="Schedule"
                        labelClass="font-light!"
                        placeholder="eg: 3AM"
                        {...modalForm.register("schedule")}
                        error={modalForm.formState.errors.schedule?.message}
                    />
                </>
            }
        </div>

        <TextArea
            rows={4}
            label="Note"
            labelClass="font-light!"
            {...modalForm.register("note")}
            placeholder="eg: Where we meeting, chat about project"
            error={modalForm.formState.errors.note?.message} />

    </>
}