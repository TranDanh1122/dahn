import React from "react";
import { DropdownInfo } from "@project/components/detail";
import RoleItem from "./Role/RoleItem.component";
import RoleDropContent from "./Role/RoleDropContent.component";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, AppState } from "@/stores";
import { FormProvider, useForm, type FieldValues } from "react-hook-form";
import { ArrayForm, type TableItemProps } from "@/components/ArrayForm";
import CirclePlus from "lucide-react/dist/esm/icons/circle-plus";
import type { RoleData } from "@project/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { roleSchema } from "@/modules/project/models/request.schema";
import { RoleModal } from "@project/components/form/Step4/Role";
import { updateRoleThunk } from "@project/store/action/updateRole.action";

export default function Step3(): React.JSX.Element {
    const project = useSelector((state: AppState) => state.project.project);

    const roles = React.useMemo(() => {
        return [...(project?.role || [])].sort((a, b) => parseInt(a?.id || '') - parseInt(b?.id || "")) || []
    }, [project?.role])
    const formRole = useForm({
        resolver: zodResolver({
            "role": roleSchema
        })
    })
    React.useEffect(() => {
        formRole.reset({ "role": roles })
    }, [roles])
    const dispatch: AppDispatch = useDispatch()
    const handleRoleUpsert = React.useCallback((data: FieldValues, index?: number) => {
        const roleData = data as RoleData
        const roleId = index == -1 ? undefined : roleData.id
        if (project && project.id)
            dispatch(updateRoleThunk({ projectId: project.id, data: roleData, fallback: project, roleId }))
    }, [project])
    // const memberList = React.useMemo(() =>
    //     project?.members.map(el =>
    //         <MemberItem
    //             key={el.id}
    //             member={el}
    //         />) || "",
    //     [project?.members])
    return <>
        <div className="space-y-3">
            {/* <h2 className="font-medium text-lg">Roles</h2> */}
            <div className="flex flex-col gap-4 justify-center text-sm h-full min-h-max py-4 relative">
                {/* {roleList} */}

                <FormProvider {...formRole}>
                    <ArrayForm
                        // triggerEl={roles.length < 4 ? <CirclePlus className="size-5 text-slate-600 absolute -top-10 right-0" /> : <div></div>}
                        name="role"
                        label="Roles"
                        customSubmit={handleRoleUpsert}
                        itemEl={<Role />}
                        modalFormSchema={roleSchema}
                        modalFormContent={<RoleModal />}
                        itemWrapper={<div className="flex flex-col gap-6 justify-center text-sm h-full w-full min-h-max py-4"></div>}
                    />

                </FormProvider>
            </div >
        </div>
        {/* <div className="space-y-3">
            <h2 className="font-medium text-lg">Users</h2>
            <div className="grid grid-cols-4 gap-3 text-sm min-h-max py-4">
                {memberList}
            </div>
        </div> */}
    </>
}
interface ItemProps extends TableItemProps {
    data?: RoleData
    clicked?: () => void
}
const Role: React.FC<ItemProps> = ({ data, clicked }): React.JSX.Element => {
    const openModal = React.useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        clicked?.()
    }, [])

    if (!data) return <></>

    return <DropdownInfo
        itemContent={<RoleItem role={data} openModal={openModal} />}
        dropContent={
            <RoleDropContent role={data} />
        } />
}