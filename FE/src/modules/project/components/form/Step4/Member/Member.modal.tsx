import { memberSchema } from "@project/models/request.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import X from "lucide-react/dist/esm/icons/x";
import { InputSearch } from "@components/InputSearch";
import { searchUserFn, type SearchUserParams, type User } from "@user";
import type { MemberModalProps } from "./useMemberModal.hook";
import { Select } from "@components/Select";
import type { EnumSelectType } from "@project/const";

export default function Member({ handleClose, index, onSubmit }: MemberModalProps): React.JSX.Element {
    const form = useFormContext();

    const memberForm = useForm<z.infer<typeof memberSchema>>({
        resolver: zodResolver(memberSchema),
    });
    const filter = React.useCallback(
        (data: User) => {
            return !form
                .getValues("members")
                ?.some((item: z.infer<typeof memberSchema>) => item.userId === data.id);
        },
        [form.watch("members")]
    );

    const childrenFn = React.useCallback(
        (data: User) => <> {data.full_name || data.email} </>,
        []);
    const resultItemClick = (data: User) => {
        console.log(data)
        memberForm.setValue("userId", data.id);
        memberForm.setValue("name", data.full_name);
    }

    const roles = React.useMemo(() => {
        return form.getValues("role").map(
            (el: { id: string, name: string }) => ({
                value: el.id,
                text: el.name
            })
        )
    }, [form.watch("role")])

    return (
        <>
            <div className="fixed top-0 left-0 bg-black/20 z-1 w-screen h-screen"></div>
            <FormProvider {...memberForm}>
                <div className="space-y-4 rounded-2xl fixed top-1/2 left-1/2 w-1/3 -translate-1/2 bg-white z-10 p-8">
                    <X onClick={handleClose}
                        className="absolute top-4 right-4 cursor-pointer text-neutral-600"
                    />
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
                            value={memberForm.watch("name")}
                        />
                        <fieldset className="w-full flex flex-col gap-2">
                            <label className="font-light text-neutral-600 cursor-pointer" >
                                Role
                            </label>
                            <Select<EnumSelectType[number]>
                                dataSets={roles}
                                defaultValue={roles[0]}
                                changeValue="value"
                                textKey="text"
                                valueKey="value"
                                className="w-full border border-neutral-300 hover:border-blue-300 rounded-lg"
                                onChange={(value) => {
                                    memberForm.setValue("role", String(value))
                                    memberForm.setValue("roleId", String(value))
                                }}
                            />
                        </fieldset>

                    </div>
                </div>
            </FormProvider>
        </>
    );
}
