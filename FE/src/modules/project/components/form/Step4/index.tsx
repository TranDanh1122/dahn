import React from "react";
import { ArrayForm } from "@components/ArrayForm";
import { RoleTableItem, RoleTableHeader, RoleModal } from "./Role";
import { roleSchema } from "@project/models/request.schema";
export default function Step4(): React.JSX.Element {

    return <>
        <ArrayForm
            name="role"
            label="Roles"
            headerEl={<RoleTableHeader />}
            itemEl={<RoleTableItem />}
            modalFormContent={<RoleModal />}
            modelFormSchema={roleSchema}
        />
        {/* <fieldset className="space-y-2" >
            <div className="flex items-center gap-2 te">
                <legend className="text-neutral-600">Members</legend>
                <Button
                    disabled={form.watch("role").length == 0}
                    onClick={() => open({ open: true })}
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
                modalState.open &&
                <Member
                    onSubmit={() => { }}
                    handleClose={() => close({ open: false })}
                />
            }
        </fieldset > */}
    </>
}