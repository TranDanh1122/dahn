import React from "react";
import {
    DropdownInfo,
} from "@project/components/detail";
import MilestoneItem from "./Milestone/MilestoneItem.component";
import { useSelector } from "react-redux";
import type { AppState } from "@/stores";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { milestoneSchema, type MilestoneData } from "@project/models/request.schema";
import { ArrayForm, type TableItemProps } from "@/components/ArrayForm";
import CirclePlus from "lucide-react/dist/esm/icons/circle-plus";
import { MilestoneModal } from "@project/components/form/Step3/Milestone";

const MilestoneDropContent = React.lazy(() => import("./Milestone/MileStoneItemDrop.component"))
export default function Step2(): React.JSX.Element {
    const project = useSelector((state: AppState) => state.project.project);

    const milestones = React.useMemo(() => {
        return [...project?.milestones || []].sort((a, b) => parseInt(a?.id || "") - parseInt(b?.id || "")) || []
    }, [project?.milestones])
    const form = useForm({
        defaultValues: {
            "milestones": milestones
        },
        resolver: zodResolver({
            "milestones": milestoneSchema
        })
    })
    React.useEffect(() => {
        form.reset({ "milestones": milestones })
    }, [milestones])
    const handleSubmit = React.useCallback(() => {

    }, [])
    return (
        <>

            <div className="space-y-4">
                <h2 className="font-medium text-lg">Milestones</h2>
                <div className="flex flex-col gap-6 justify-center text-sm h-full min-h-max py-4">
                    <div className="grid grid-cols-4 text-sm font-medium">
                        <span>Name</span>
                        <span>Duration</span>
                        <span>Process</span>
                        <span>Status</span>
                    </div>

                    <FormProvider {...form}>
                        <ArrayForm
                            triggerEl={milestones.length < 4 ? <CirclePlus className="size-5 text-slate-600 absolute -top-10 right-0" /> : <></>}
                            name="milestones"
                            label=""
                            customSubmit={handleSubmit}
                            itemEl={<Item />}
                            modalFormSchema={milestoneSchema}
                            modalFormContent={<MilestoneModal />}
                            itemWrapper={<div className="flex flex-col gap-6 justify-center text-sm h-full w-full min-h-max py-4"></div>}
                        />

                    </FormProvider>

                </div >
            </div>
        </>
    );
}
interface ItemProps extends TableItemProps {
    data?: MilestoneData
    clicked?: () => void
}
const Item: React.FC<ItemProps> = ({ data, clicked }): React.JSX.Element => {

    const openModal = React.useCallback((e: React.MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        clicked()
    }, [])
    if (!data) return <></>
    return <DropdownInfo
        itemContent={<MilestoneItem milestone={data} openModal={openModal} />}
        dropContent={<MilestoneDropContent milestone={data} />}
    />
}