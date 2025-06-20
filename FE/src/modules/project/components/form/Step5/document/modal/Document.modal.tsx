import React from "react"
import type { ModalProps } from "@components/ArrayForm"
import { z } from "zod"
import type { documentSchema } from "@project/models/request.schema"
import Input from "@components/Input.component"
import TextArea from "@components/TextArea.component"
import { Select } from "@components/Select"
import { type EnumSelectType, DocumentStatus } from "@project/const"
import { useSelector } from "react-redux"
import type { AppState } from "@/stores"
export default function DocumentModal({ modalForm }: ModalProps<z.infer<typeof documentSchema>>): React.JSX.Element {
    const user = useSelector((state: AppState) => state.persist.auth.user)
    React.useEffect(() => {
        if (!modalForm) return
        if (!modalForm.getValues("status")) modalForm.setValue("status", "uptodate")
        if (!modalForm.getValues("user.id") && user) modalForm.setValue("user", user)
        if (!modalForm.getValues("userid") && user) modalForm.setValue("userid", Number(user.id))
    }, [])

    if (!modalForm) return <></>

    return <>
        <div className="flex items-end gap-4">
            <Input
                fieldsetClass="w-full"
                label="Document Name"
                labelClass="font-light!"
                placeholder="eg: Git rule in this project"
                {...modalForm.register("name")}
                error={modalForm.formState.errors.name?.message}
            />

            <fieldset className="w-full flex flex-col gap-2">
                <label className="font-light text-slate-600 cursor-pointer" >
                    Status
                </label>
                <Select<EnumSelectType[number]>
                    dataSets={DocumentStatus}
                    defaultValue={DocumentStatus[0]}
                    changeValue="value"
                    textKey="text"
                    valueKey="value"
                    className="w-full border border-slate-300 hover:border-blue-300 rounded-lg"
                    onChange={(value) => {
                        if (typeof value == "string")
                            modalForm.setValue("status", String(value))
                    }}
                />
            </fieldset>
        </div>
        <Input
            fieldsetClass="w-full"
            label="Link"
            labelClass="font-light!"
            placeholder="eg: https://google.drive/folder/git-tutorial.docx"
            {...modalForm.register("link")}
            error={modalForm.formState.errors.link?.message}
        />
        <TextArea
            rows={4}
            label="Note"
            labelClass="font-light!"
            {...modalForm.register("note")}
            placeholder="eg: Branch name need start with cyl__001...v..v"
            error={modalForm.formState.errors.note?.message} />

    </>
}