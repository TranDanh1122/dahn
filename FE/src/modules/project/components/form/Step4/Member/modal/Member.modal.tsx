import { memberSchema } from "@project/models/request.schema";
import React from "react";
import { z } from "zod";
import { InputSearch } from "@components/InputSearch";
import { searchUserFn, type SearchUserParams, type User } from "@user";
import { Select } from "@components/Select";
import type { EnumSelectType } from "@project/const";
import type { ModalProps } from "@components/ArrayForm";
import { useMemberModal } from "./useMemberModal.hook";
import Input from "@components/Input.component";
import TextArea from "@components/TextArea.component";
import { useFormContext } from "react-hook-form";
export default function Member({ form }: ModalProps<z.infer<typeof memberSchema>>): React.JSX.Element {
    const modalForm = useFormContext<z.infer<typeof memberSchema>>()

    const hookData = useMemberModal({ modalForm, form })


    if (!modalForm || !form) return <></>

    const {
        resultItemClick,
        roles,
        filter,
        childrenFn,
        pikedUser,
        defaultValue
    } = hookData
    return (
        <>
            <div className="flex items-end gap-4">
                <InputSearch<User, SearchUserParams>
                    searchServiceFn={searchUserFn}
                    resultItemClick={resultItemClick}
                    // {...memberForm.register("userId")}
                    filter={filter}
                    childrenFn={childrenFn}
                    label="User"
                    labelClass="font-light!"
                    fieldsetClass="w-full!"
                    value={pikedUser}
                    error={modalForm.formState.errors.user?.message}
                />
                <fieldset className="w-full flex flex-col gap-2">
                    <label className="font-light text-slate-600 text-sm cursor-pointer" >
                        Role
                    </label>
                    <Select<EnumSelectType[number]>
                        dataSets={roles}
                        defaultValue={defaultValue}
                        changeValue="all"
                        textKey="text"
                        valueKey="value"
                        className="w-full border border-slate-300 hover:border-blue-300 rounded-lg"
                        onChange={(value) => {
                            if (typeof value == "object") {
                                modalForm.setValue("roleId", value.value)
                            }
                        }}
                    />
                </fieldset>

            </div>
            <div className="flex items-center gap-4 w-full">
                <Input
                    fieldsetClass="w-full"
                    label="Hourly Rate ($/h)"
                    labelClass="font-light!"
                    placeholder="eg: 15"
                    {...modalForm.register("hourlyRate")}
                    error={modalForm.formState.errors.hourlyRate?.message}
                />
                <Input
                    fieldsetClass="w-full"
                    label="Total hours (h)"
                    labelClass="font-light!"
                    placeholder="eg: 100"
                    {...modalForm.register("hours")}
                    error={modalForm.formState.errors.hours?.message}
                />
            </div>
            <TextArea
                rows={4}
                label="Note"
                labelClass="font-light!"
                {...modalForm.register("note")}
                placeholder="eg: This guy is a newbie"
                error={modalForm.formState.errors.note?.message} />
        </>
    );
}
