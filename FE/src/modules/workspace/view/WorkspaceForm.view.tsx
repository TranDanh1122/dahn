import React from "react"
import Input from "@/components/Input.component"
import TextArea from "@/components/TextArea.component"
import { useForm } from "react-hook-form"
import { type WorkspaceFormData, WorkspaceFormSchema } from "@workspace/models/request.schema"
import { zodResolver } from "@hookform/resolvers/zod"
export default function WorkspaceForm(): React.JSX.Element {
    const form = useForm<WorkspaceFormData>({
        defaultValues: { name: "", thumbnail: "", description: "", members: [] },
        resolver: zodResolver(WorkspaceFormSchema),
        mode: "all"
    })
    const onSubmit = (values: WorkspaceFormData) => {
        console.log(values)
    }
    return <>
        <div className="fixed w-screen h-screen bg-white z-1 top-0 left-0 flex flex-col items-center justify-center-safe gap-12">
            <div className="flex items-center gap-10">
                <div className="flex items-center gap-2 text-sm">
                    ① <span className="font-medium">Basic infomation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    ② <span className="font-medium">Add your workspace member</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    ③<span className="font-medium">Finish setting</span>
                </div>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 md:w-1/2 lg:w-1/3 w-full px-2">
                <h1 className="text-neutral-600 text-2xl font-light text-center">Create Workspace</h1>
                <div className="space-y-4">
                    <div>
                        <Input label="Workspace Name" {...form.register("name")} placeholder="eg: Dream team 1" />
                        <small className="pl-2">Workspace, mean that you company/team or something you want</small>
                    </div>
                    
                    <TextArea label="Description" placeholder="eg: This is my start up" />
                </div>
            </form>
        </div>
    </>
}