import type { User } from "@user";
import type { memberSchema, roleSchema } from "@project/models/request.schema";
import React from "react";
import { z } from "zod";
import type { ModalProps } from "@components/ArrayForm";

export const useMemberModal = ({ modalForm, form }: ModalProps<z.infer<typeof memberSchema>>) => {
    const filter = React.useCallback(
        (data: User) => {
            if (form)
                return !form
                    .getValues("members")
                    ?.some((item: z.infer<typeof memberSchema>) => item.user.id === data.id);
            return true
        },
        [form?.watch("members")]
    );

    const childrenFn = React.useCallback(
        (data: User) => <>{data.full_name || data.email} </>,
        []);
    const resultItemClick = (data: User) => {
        modalForm?.setValue("user", data);
    }

    const roles = React.useMemo(() => {
        return form?.getValues("role").map((el: z.infer<typeof roleSchema>) => {
            return { value: el.id, text: el.name }
        })
    }, [form?.watch("role")])

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
        pikedUser
    }
}

