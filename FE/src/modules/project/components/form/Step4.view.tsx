import React from "react";
import RoleField from "./components/RoleField.component";
import Button from "@components/Button.component"
import { useModal } from "@/common/hooks/useModal";
import Member from "./components/modal/Member/Member.modal";
import { useFormContext } from "react-hook-form";
export default function Step4(): React.JSX.Element {
    const { modalState, close, open } = useModal<{ index?: number, open: boolean }>()
    React.useEffect(() => {
        console.log(modalState)
    }, [modalState])
    const form = useFormContext()
    return <>
        <RoleField />
        <fieldset className="space-y-2" >
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
        </fieldset >
    </>
}