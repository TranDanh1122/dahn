import type { User } from "@user";
import type { memberSchema, roleSchema } from "@project/models/request.schema";
import React from "react";
import { z } from "zod";
import type { ModalProps } from "@components/ArrayForm";
import type { EnumSelectType } from "@project/const";

export const useMemberModal = ({ modalForm, form }: ModalProps<z.infer<typeof memberSchema>>) => {
    const filter = React.useCallback(
        (data: User) => {
            console.log(form?.getValues("members"), data)
            if (form)
                return !form
                    .getValues("members")
                    ?.some((item: z.infer<typeof memberSchema>) => item.user.id == data.id);
            return false
        },
        [form?.watch("members")]
    );

    const childrenFn = React.useCallback(
        (data: User) => <>{data.full_name || data.email} </>,
        []);
    const resultItemClick = (data: User) => {
        modalForm?.setValue("user", data);
        modalForm?.setValue("userid", data.id)
    }

    const roles = React.useMemo(() => {
        return form?.getValues("role").map((el: z.infer<typeof roleSchema>) => {
            return { value: el.id, text: el.name }
        })
    }, [form?.watch("role")])

    const defaultValue = React.useMemo(() => {
        return roles.find((el: EnumSelectType[number]) => el.value == modalForm?.getValues("roleId")) || roles[0]
    }, [roles, modalForm])

    React.useEffect(() => {
        if (!modalForm?.getValues("roleId")) {
            modalForm?.setValue("roleId", roles[0]?.value)
        }
    }, [modalForm?.watch("roleId")])
    const pikedUser = React.useMemo(() => {
        const user = modalForm?.getValues("user")
        if (user)
            return user.full_name || user.email
        return ""
    }, [modalForm?.watch("user")])

    return {
        roles,
        resultItemClick,
        childrenFn,
        filter,
        pikedUser,
        defaultValue
    }
}

