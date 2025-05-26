import React from "react"
import Step1 from "@workspace/view/form/Step1.view"
import Step2 from "@workspace/view/form/Step2.view"
import { FormProvider, useForm } from "react-hook-form"
import { type WorkspaceFormData, WorkspaceFormSchema } from "@workspace/models/request.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@/components/Button.component"
import { X } from "lucide-react"
import { Link } from "react-router-dom"
/** 
 * @returns ok we have a form step here, but, again and again, this just FE code and it not use to lauch any rocket to the moon
 * So, please simple :  one form! We have 3 step, but just one form
 * If need to add more step, just create a new view and use it
 * When change step, just change the state and render the view, trigger the form validation
 */
const stepFields: Record<number, (keyof WorkspaceFormData)[]> = {
    1: ["name", "description", "thumbnail"],
    2: ["members"],
};
export default function WorkspaceForm(): React.JSX.Element {
    const form = useForm<WorkspaceFormData>({
        defaultValues: {
            name: "", thumbnail: "", description: "", members: [
                {
                    email: "", avg_salary: ""
                }
            ]
        },
        resolver: zodResolver(WorkspaceFormSchema),
        mode: "all"
    })
    const onSubmit = (values: WorkspaceFormData) => {
        console.log(values)
    }
    const [step, changeStep] = React.useState<number>(1)
    const handleBack = () => {
        changeStep(prev => prev - 1)
    }
    const handleNext = () => {
        if (step < 3) {
            form.trigger(stepFields[step]).then((isValid) => {
                if (!isValid) return
                changeStep(prev => prev + 1)
            })
        }
    }
    return <>
        <div className="fixed w-screen h-screen bg-white z-1 top-0 left-0 flex flex-col items-center justify-center-safe gap-12">
            <Link to="/"><X className="absolute top-2 right-2 size-6 text-neutral-500" /></Link>
            <div className="flex items-center gap-10">
                <div className={`flex items-center gap-2 ${step === 1 ? "text-neutral-800" : "text-neutral-400"}`}>
                    ① <span className="font-medium">Basic infomation</span>
                </div>
                <div className={`flex items-center gap-2 ${step === 2 ? "text-neutral-800" : "text-neutral-400"}`}>
                    ② <span className="font-medium">Add your workspace member</span>
                </div>
                <div className={`flex items-center gap-2  ${step === 3 ? "text-neutral-800" : "text-neutral-400"}`}>
                    ③ <span className="font-medium">Finish setting</span>
                </div>
            </div>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 md:w-1/3 lg:w-1/4 w-full px-2" encType="multipart/form-data">
                    {
                        step == 1 && <Step1 />
                    }
                    {
                        step == 2 && <Step2 />
                    }
                    {
                        step == 3 && <>Hmm, this is plan select view, but now i decided public assets and soure-code after done, so removed this form</>
                    }

                    <div className="flex items-center justify-between text-sm py-2">
                        {step > 1 && <Button className="border border-neutral-300" onClick={handleBack} type="button">Back</Button>}
                        <Button
                            onClick={handleNext}
                            type={step === 3 ? "submit" : "button"}
                            className="text-white bg-blue-500 hover:bg-blue-300 ml-auto">
                            {step === 3 ? "Finish" : "Next"}
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    </>
}